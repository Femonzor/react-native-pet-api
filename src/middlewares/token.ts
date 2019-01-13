import Koa from 'koa';
import User from '../models/user';

export default async (ctx: Koa.Context, next: Function) => {
  const accessToken = ctx.query.accessToken || ctx.request.body.accessToken;
  if (!accessToken) {
    ctx.body = {
      code: 4,
      message: 'token 错误',
    };
    return;
  }
  const user = await User.findOne({
    accessToken,
  });
  if (!user) {
    ctx.body = {
      code: 5,
      message: 'token 错误',
    };
    return;
  }
  ctx.session.user = user;
  await next();
};
