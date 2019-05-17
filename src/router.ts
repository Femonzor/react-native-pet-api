import Router from 'koa-router';
import audio from './controllers/audio';
import auth from './controllers/auth';
import media from './controllers/media';
import user from './controllers/user';
import video from './controllers/video';
import body from './middlewares/body';
import token from './middlewares/token';

export default (() => {
  const router = new Router({
    prefix: '/api',
  });
  router.post('/user/signup', body, user.signup);
  router.post('/user/verify', body, user.verify);
  router.post('/user/update', body, token, user.update);
  router.post('/signature', body, token, auth.signature);
  router.post('/videos', body, token, video.create);
  router.post('/audios', body, token, audio.create);
  router.post('/medias', body, token, media.create);
  return router;
})();
