// Promise.resolve

var pp1 = Promise.resolve({ a: '1' });
pp1.then(res => {
  console.log(res);
});
// 会调用对象的then方法，结果 先打印hahaah  在打印Promise.resolve+then,这是因为立即resolve的Promise会在本次事件循环末尾调用
var pp2 = Promise.resolve({
  a: '2', then(resolve) {
    resolve('Promise.resolve+then');
    console.log('hahaah');
  }
});
pp2.then(res => {
  console.log(res);
});