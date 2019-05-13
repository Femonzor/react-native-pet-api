import Koa from 'koa';
import Video from '../models/video';
import { uploadToCloudinary } from '../utils';

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
    const url = `http://res.cloudinary.com/yang/video/upload/e_volume:-100/${videoData.public_id}.${videoData.format}`;
    console.log(`url: ${url}`);
    try {
      const result = await uploadToCloudinary(url, 'mute-video', videoData.public_id);
      console.log(result);
      video = new Video({
        author: user._id,
        detail: result,
        publicId: result.public_id,
      });
      video = await video.save();
      ctx.body = {
        code: 0,
        data: video._id,
        message: 'success',
      };
    } catch (error) {
      console.error(`error: ${JSON.stringify(error)}`);
      ctx.body = {
        code: -1,
        message: 'mute video error',
      };
    }
    return;
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
