import Koa from 'koa';
import xss from 'xss';
import User from '../models/user';

const signup = async (ctx: Koa.Context, next: Function) => {
  const phoneNumber = ctx.request.body.phoneNumber;
  console.log(phoneNumber);
  let user = await User.findOne({
    phoneNumber,
  });
  if (!user) {
    user = new User({
      phoneNumber: xss(phoneNumber),
    });
  } else {
    user.verifyCode = '1212';
  }
  try {
    console.log('to save');
    user = await user.save();
    console.log(user);
  } catch (e) {
    ctx.body = {
      code: -1,
      message: e,
    };
    return;
  }
  ctx.body = {
    code: 0,
    message: 'success',
  };
};

const verify = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    success: true,
  };
};

const update = async (ctx: Koa.Context, next: Function) => {
  ctx.body = {
    success: true,
  };
};

export default {
  signup,
  update,
  verify,
};
