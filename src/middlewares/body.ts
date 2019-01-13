import Koa from 'koa';
import xss from 'xss';

export default async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body || {};
  if (!Object.keys(body).length) {
    ctx.body = {
      code: 1,
      message: '参数错误',
    };
    console.log('empty');
    return;
  }
  Object.keys(body).forEach(field => {
    if (field === 'phoneNumber') {
      body[field] = body[field].trim();
    }
    body[field] = xss(body[field]);
  });
  await next();
};
