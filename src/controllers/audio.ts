import Koa from 'koa';
import Audio from '../models/audio';
import Video from '../models/video';
import { asyncMedia } from '../utils';

const create = async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body;
  const audioData = JSON.parse(body.audio);
  const videoId = body.videoId;
  const user = ctx.session.user;

  if (!audioData || !audioData.public_id) {
    ctx.body = {
      code: 1,
      message: '音频上传失败',
    };
    return next();
  }

  let audio = await Audio.findOne({
    publicId: audioData.public_id,
  }).exec();

  const video = await Video.findOne({
    _id: videoId,
  }).exec();

  if (!audio) {
    const tempAudio: any = {
      author: user._id,
      detail: audioData,
      publicId: audioData.public_id,
    };
    if (video) {
      tempAudio.video = video._id;
    }
    audio = new Audio(tempAudio);
    audio = await audio.save();
  }

  console.log('合成媒体');
  asyncMedia(video, audio);

  ctx.body = {
    code: 0,
    data: audio._id,
    message: 'success',
  };
};

export default {
  create,
};
