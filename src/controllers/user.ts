import Koa from 'koa';
import uuid from 'uuid';
import xss from 'xss';
import User from '../models/user';

const signup = async (ctx: Koa.Context, next: Function) => {
  const phoneNumber = ctx.request.body.phoneNumber;
  if (!phoneNumber) {
    ctx.body = {
      code: 1,
      message: '请输入手机号',
    };
    return next();
  }
  let user = await User.findOne({
    phoneNumber,
  });
  if (!user) {
    user = new User({
      accessToken: uuid.v4(),
      avatar: 'http://dummyimage.com/640x640/bbf279',
      nickname: `用户${phoneNumber}`,
      phoneNumber: xss(phoneNumber),
      verifyCode: '111111',
    });
  } else {
    user.verifyCode = '1212';
  }
  try {
    user = await user.save();
  } catch (e) {
    ctx.body = {
      code: -1,
      message: e,
    };
    return next();
  }
  ctx.body = {
    code: 0,
    message: 'success',
  };
};

const verify = async (ctx: Koa.Context, next: Function) => {
  const verifyCode = ctx.request.body.verifyCode;
  const phoneNumber = ctx.request.body.phoneNumber;
  if (!verifyCode || !phoneNumber) {
    ctx.body = {
      code: 1,
      message: '短信验证失败',
    };
    return next();
  }
  let user = await User.findOne({
    phoneNumber,
    verifyCode,
  });
  if (user) {
    user.verified = true;
    user = await user.save();
    ctx.body = {
      code: 0,
      data: {
        _id: user._id,
        accessToken: user.accessToken,
        avatar: user.avatar,
        nickname: user.nickname,
      },
      message: 'success',
    };
  } else {
    ctx.body = {
      code: 2,
      message: '短信验证失败',
    };
  }
};

const update = async (ctx: Koa.Context, next: Function) => {
  const body = ctx.request.body;
  const { accessToken } = body;
  let user = ctx.session.user;
  const fileds = 'avatar,gender,age,nickname,breed'.split(',');
  fileds.forEach(field => {
    if (body[field]) {
      user[field] = body[field];
    }
  });
  user = await user.save();
  ctx.body = {
    code: 0,
    data: {
      _id: user._id,
      accessToken: user.accessToken,
      age: user.age,
      avatar: user.avatar,
      breed: user.breed,
      gender: user.gender,
      nickname: user.nickname,
    },
    message: 'success',
  };
};

export default {
  signup,
  update,
  verify,
};
