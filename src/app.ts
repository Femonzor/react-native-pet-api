import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import router from './router';

const app = new Koa();

app.keys = ['react-native-pet-api'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
console.log('Listening: 3001');
