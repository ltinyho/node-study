const koa    = require('koa');
const Router = require('koa-router');
const app    = new koa();
const router = new Router();
app.use(async function (ctx, next) {
  console.log('>> one');
  await next();
  console.log('<< one');
});

app.use(async function (ctx, next) {
  console.log('>> two');
  ctx.body = 'two';
  await next();
  console.log('<< two');
});

app.use(async function (ctx, next) {
  console.log('>> three');
  await next();
  console.log('<< three');
});

router.get('/', async (ctx, next) => {
  await next();
  ctx.body = '1';
});
app
.use(router.routes())
.use(router.allowedMethods());
app.listen(3000, () => {
  console.log('http://localhost:3000');
});