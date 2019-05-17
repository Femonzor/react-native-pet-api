import Koa from 'koa';

const create = async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body;
  const { videoId, audioId, title } = body;

  console.log(`videoId: ${videoId}`);
  console.log(`audioId: ${audioId}`);
  console.log(`title: ${title}`);

  ctx.body = {
    code: 0,
    message: 'success',
  };
};

export default {
  create,
};
