import Koa from 'koa';
import Video from '../models/video';

const create = async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body;
  const videoData = JSON.parse(body.video);
  const user = ctx.session.user;

  if (!videoData) {
    ctx.body = {
      code: 1,
      message: '视频上传失败',
    };
    return next();
  }

  let video = await Video.findOne({
    publicId: videoData.public_id,
  }).exec();

  if (!video) {
    console.log(`userId: ${user._id}`);
    console.log(`publicId: ${videoData.public_id}`);
    video = new Video({
      author: user._id,
      publicId: videoData.public_id,
    });
    video = await video.save();
  }

  ctx.body = {
    code: 0,
    data: video._id,
    message: 'success',
  };
};

export default {
  create,
};
