import koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';

const app = new koa();

app.keys = ['react-native-pet-api'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log(ctx.href);
  console.log(ctx.method);
  ctx.body = {
    success: true,
  };
  await next();
});

app.listen(3001);
console.log('Listening: 3001');
