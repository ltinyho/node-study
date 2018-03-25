// Promise.try()  由于Promise.try为所有操作提供了统一的处理机制，所以如果想用then方法管理流程,最好都用Promise.try包装一下。
// 实现方法
Promise.try = function (func) {
  return new this(function (resolve) {
    resolve(func());
  });
};

setTimeout(() => {
  console.log('3');
}, 0);

var a = function () {
  console.log('aaa');
  return 'a';
};
new Promise(function (resolve, reject) {
  resolve(a());
  console.log('22');
}).then(res => {
  console.log(res);
});

Promise.try(a).then(res => {
  console.log(res);
});

console.log(1);
