const url = require('url');

function Route() {
  this.routers = {};
}

Route.prototype.get = function (pathname, cb) {
  this.routers[pathname] = cb
};

module.exports = Route;