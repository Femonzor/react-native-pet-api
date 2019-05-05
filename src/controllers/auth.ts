import Koa from 'koa';
import sha1 from 'sha1';
import uuid from 'uuid';
import config from '../config';

const signature = async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body;
  const { timestamp, type } = body;
  let folder: string;
  let tags: string;
  if (type === 'avatar') {
    folder = 'react-native-pet/avatar';
    tags = 'app,avatar';
  } else if (type === 'video') {
    folder = 'react-native-pet/mute-video';
    tags = 'app,video';
  } else if (type === 'audio') {
    folder = 'react-native-pet/audio';
    tags = 'app,audio';
  }
  const sign = sha1(`folder=${folder}&tags=${tags}&timestamp=${timestamp}${config.cloudinary.api_secret}`);
  ctx.body = {
    code: 0,
    data: {
      key: uuid.v4(),
      token: sign,
    },
    message: 'success',
  };
};

export default {
  signature,
};
