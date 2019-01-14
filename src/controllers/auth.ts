import Koa from 'koa';
import sha1 from 'sha1';
import config from '../config';

const signature = async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body;
  const { timestamp, type } = body;
  let folder: string;
  let tags: string;
  if (type === 'avatar') {
    folder = 'avatar';
    tags = 'app,avatar';
  } else if (type === 'video') {
    folder = 'video';
    tags = 'app,video';
  } else if (type === 'audio') {
    folder = 'audio';
    tags = 'app,audio';
  }
  const sign = sha1(`folder=${folder}&tags=${tags}&timestamp=${timestamp}${config.cloudinary.api_secret}`);
  ctx.body = {
    code: 0,
    data: sign,
    message: 'success',
  };
};

export default {
  signature,
};
