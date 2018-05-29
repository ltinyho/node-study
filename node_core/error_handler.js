var as = function (callback) {
  process.nextTick(function () {

    try {
      throw new Error(2);
    } catch (e) {
      return callback(e);
    }
    callback();
  });
};
as(function (e) {
  console.log(555);
});