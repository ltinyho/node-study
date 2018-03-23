const express = require('express');
const app     = express();
app.use('/static', express.static('static'));
app.use((req, res, next) => {
  console.log(Date.now());
  next();
});
app.get('/', (req, res) => {
  res.send('hello,world');
});
app.post('/', (req, res) => {
  res.send('post');
});
app.delete('/', (req, res) => {
  res.send('delete');
});
app.put('/', (req, res) => {
  res.send('put');
});
app.all('/test', (req, res, next) => {
  res.a = 'lzh';
  next();
});

app.all('/lzhj?', (req, res) => {
  res.send(req.url);
});
app.all('/lz+zh', (req, res) => {
  res.send(req.url);
});
app.all('/ssq*zh', (req, res) => {
  res.send(req.url);
});

app.all('/jpr(zzl)?', (req, res) => {
  res.send(req.url);
});
app.all('/test', (req, res) => {
  res.send(res.a);
});
app.get('/user/:uid', (req, res, next) => {
  if (req.params['uid'] > 10) {
    next();
  } else {
    res.send('id小于10');
  }
}, (req, res) => {
  res.send('可以呀');
});

app.get('/user/get/list', [(req, res, next) => {
  console.log(10);
  next('ddd');
}, (req, res, next) => {
  console.log(4);
  next();
}, (req, res) => {
  res.status(300).send('ok');
}]);

app.get('/user/get/list', (req, res) => {
  res.send('hah');
});
app.use('/user/get/list', (err, req, res, next) => {
  if (err) {
    res.send('error');
  }
});

app.route('/chain').get((req, res) => {
  res.send('1');
}).post((req, res) => {
  res.send('2');
});
app.listen('8888', () => {
  console.log('http://localhost:8888');
});
