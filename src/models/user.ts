import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  accessToken: string;
  age: string;
  areaCode: string;
  avatar: string;
  breed: string;
  gender: string;
  meta: {
    createAt: number;
    updateAt: number;
  };
  nickname: string;
  phoneNumber: {
    type: number;
    unique: true;
  };
  verifyCode: string;
}

const UserSchema = new mongoose.Schema({
  accessToken: String,
  age: String,
  areaCode: String,
  avatar: String,
  breed: String,
  gender: String,
  meta: {
    createAt: {
      default: Date.now(),
      type: Date,
    },
    updateAt: {
      default: Date.now(),
      type: Date,
    },
  },
  nickname: String,
  phoneNumber: {
    type: String,
    unique: true,
  },
  verifyCode: String,
});

UserSchema.pre<IUser>('save', function(next) {
  if (!this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

export default mongoose.model<IUser>('User', UserSchema);
