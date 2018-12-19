import Router from 'koa-router';
import auth from './controllers/auth';
import user from './controllers/user';

export default (() => {
  const router = new Router({
    prefix: '/api',
  });
  router.post('/user/signup', user.signup);
  router.post('/user/verify', user.verify);
  router.post('/user/update', user.update);
  router.post('/signature', auth.signature);
  return router;
})();
