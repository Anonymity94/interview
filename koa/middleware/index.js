const Koa = require('koa2');
const app = new Koa();

console.log(typeof app);

app.use(async (ctx, next) => {
  console.log('11111 - 开始');
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  console.log('11111 - 结束');
});

app.use(async (ctx, next) => {
  console.log('22222 - 开始');
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  console.log('22222 - 结束');
});

app.use(async (ctx, next) => {
  console.log('33333 - 开始');
  ctx.body = 'Hello world!';
  console.log('33333 - 结束');
});

app.listen(8000);
