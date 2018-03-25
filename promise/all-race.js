
// Promise.all 传入一个由Promise组成的数组，只有当每个promise都resolve的时候，Promise.all().then 才会被调用，如果单个Promise没有调用自己的的catch方法，那么会被Promise.all().catch()捕获错误。

// Promise.race 也是传入一个由Promise组成的数组，只要有一个Promise的状态改变，这个新的Promise实例状态就会跟着改变

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1');
  }, 1000);
});

var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2');
  }, 3000);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3');
  }, 2000);
});

// 结果 ['p1','p2','p3']
Promise.all([p1, p2, p3]).then(res => {
  console.log(res);
});
// 结果 p1
Promise.race([p1, p2, p3]).then(res => {
  console.log(res);
});