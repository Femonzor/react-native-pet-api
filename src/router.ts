import Router from 'koa-router';
import auth from './controllers/auth';
import user from './controllers/user';
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
  return router;
})();
