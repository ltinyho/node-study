var pro = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('start');
    resolve(555);
  }, 1000);
});

var pro2 = new Promise(function (resolve, reject) {
  console.log('p2');
  setTimeout(() => {
    console.log('p2 start');
    resolve(pro);
    console.log('p2 end');
  }, 500);
});

pro2.then((res) => {
  console.log(res);
});
// p2的状态由resolve传入的p1的状态决定，需要等待p1的状态确定

// 立即resolve的Promise在本轮事件循环的末尾执行的。
// 一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外
new Promise((resolve, reject) => {
  console.log(1);
  return resolve(2);
  console.log(3);
}).then((res) => {
  console.log(res);
});



// promise错误会一直向后传递,如果没有指定catch方法的话，Promise对象抛出的错误不会传递到外层代码

// Promise.finally() 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作,总是返回原来的值




