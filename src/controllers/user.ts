import Koa from 'koa';

const signup = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    success: true,
  };
};

const verify = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    success: true,
  };
};

const update = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    success: true,
  };
};

export default {
  signup,
  update,
  verify,
};
