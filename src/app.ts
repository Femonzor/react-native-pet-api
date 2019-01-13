import bbPromise from 'bluebird';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import mongoose from 'mongoose';
import config from './config';
import router from './router';

mongoose.Promise = bbPromise;
mongoose.connect(
  config.mongodb.url,
  { useNewUrlParser: true },
  error => {
    if (error) {
      console.log(`connection error: ${error}`);
    } else {
      console.log(`connection success`);
    }
  },
);
const app = new Koa();

app.keys = ['react-native-pet-api'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3001);
console.log('Listening: 3001');
