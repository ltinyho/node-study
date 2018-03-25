function MyPromise(executor) {
  var self                = this;
  self.status             = 'pending';
  self.data               = null;
  self.onResolvedCallback = [];
  self.onRejectdCallback  = [];
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

  function resolve(value) {
    if (value instanceof MyPromise) return value.then(resolve, reject);
    // 保证立即调用的resolve后面then方法添加的函数能够执行
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'fulfilled';
        self.data   = value;
        for (var i = 0, len = self.onResolvedCallback.length; i < len; i++) {
          self.onResolvedCallback[i](value);
        }
      }
    }, 0);
  }

  function reject(reason) {
    if (reason instanceof MyPromise) return reason.then(resolve, reject);
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'reject';
        self.data   = reason;
        for (var i = 0, len = self.onRejectdCallback.length; i < len; i++) {
          self.onRejectdCallback[i](reason);
        }
      }
    }, 0);

  }
}

MyPromise.prototype.then = function (onResolve, onRejectd) {
  var self  = this;
  onResolve = typeof onResolve === 'function' ? onResolve : function (value) {
    /*  解决值的穿透问题 MyPromise().then().then().then(res => {
        console.log(res);
      });*/
    return value;
  };
  onRejectd = typeof onRejectd === 'function' ? onRejectd : function (reason) {
    throw reason;
  };

  if (self.status === 'fulfilled') {
    return new MyPromise(function (resolve, reject) {
      var x = onResolve(self.data);
      if (x instanceof MyPromise) {
        x.then(resolve, reject);  // resolve 已经执行状态改变了，下面的 resolve 不会再执行了
      }
      resolve(x);
    });
  }
  if (self.status === 'reject') {
    return new MyPromise(function (resolve, reject) {
      var x = onRejectd(self.data);
      if (x instanceof MyPromise) {
        x.then(resolve, reject); // reject 已经执行状态改变了，下面的 reject 不会再执行了
      }
      reject(x);
    });
  }

  // 当pending时，不能确定调用 onResolve,还是 onRejectd
  if (self.status === 'pending') {
    return new MyPromise(function (resolve, reject) {
      self.onResolvedCallback.push(function (val) {
        try {
          var x = onResolve(self.data);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectdCallback.push(function (reason) {
        try {
          var x = onResolve(self.data);
          if (x instanceof MyPromise) {
            x.then(resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

MyPromise.prototype.catch = function (onRejectd) {
  return this.then(null, onRejectd);
};

var p = new MyPromise(function (resolve, reject) {
  resolve(333);
});

p.then(function (val) {
  console.log(val);
});
p.then(function (val) {
  console.log(val);
});
