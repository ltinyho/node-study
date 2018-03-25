const express = require('express');
const app     = express();

app.get('/lzh', (req, res, next) => {
  next();
}, (req, res) => {
  console.log(req.route);
  res.send('hello,world');
});
app.post('/lzh', (req, res) => {

});
app.get('/haha', (req, res, next) => {

  next();
}, (req, res) => {

});
app.listen('8888', () => {
  console.log('http://localhost:8888');
});
