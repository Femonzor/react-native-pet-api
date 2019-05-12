import bbPromise from 'bluebird';
import config from './config';
// tslint:disable-next-line:no-var-requires
const cloudinary = require('cloudinary').v2;

cloudinary.config(config.cloudinary);

const uploadToCloudinary = (url: string) => {
  return new bbPromise((resolve, reject) => {
    cloudinary.uploader.upload(
      url,
      {
        folder: 'react-native-pet/video',
        resoruce_type: 'video',
      },
      (error: any, result: any) => {
        if (result && result.public_id) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );
  });
};

export const asyncMedia = (video: any, audio: any) => {
  console.log('检查数据有效性');
  if (!video || !video.publicId || !audio || !audio.publicId) {
    console.log('video is', video);
    console.log('audio is', audio);
    return;
  }
  console.log('开始同步音频视频');
  const videoPublicId = video.publicId;
  const audioPublicId = audio.publicId.replace(/\//g, ':');
  const videoName = `${videoPublicId.replace(/\//g, '_')}.mp4`;
  const videoUrl = `http://res/cloudinary.com/yang/video/upload/e_volume:-100/e_volume:400,l_video:${audioPublicId}/${videoPublicId}.mp4`;
  const thumbName = `${videoPublicId.replace(/\//g, '_')}.jpg`;
  const thumbUrl = `http://res/cloudinary.com/yang/video/upload/${videoPublicId}.jpg`;
  console.log(`videoPublicId:${videoPublicId}`);
  console.log(`audioPublicId:${audioPublicId}`);
  console.log(`videoName:${videoName}`);
  console.log(`videoUrl:${videoUrl}`);
  console.log(`thumbName:${thumbName}`);
  console.log(`thumbUrl:${thumbUrl}`);

  uploadToCloudinary(videoUrl)
    .then(data => {
      console.log('promise data');
      console.log(data);
    })
    .catch(error => {
      console.log('promise errro');
      console.log(error);
    });
};
