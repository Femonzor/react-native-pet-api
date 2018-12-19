import Koa from 'koa';

const signature = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    success: true,
  };
};

export default {
  signature,
};
