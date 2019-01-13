import Koa from 'koa';

export default async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body || {};
  if (!body || !Object.keys(body).length) {
    ctx.body = {
      code: 1,
      message: '参数错误',
    };
    console.log('empty');
    return next();
  }
  next();
};
