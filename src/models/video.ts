import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

interface IVideo extends mongoose.Document {
  author: {
    type: string;
    ref: 'User';
  };
  publicId: {
    type: string;
    unique: true;
  };
  detail: any;
  meta: {
    createAt: number;
    updateAt: number;
  };
}

const VideoSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: ObjectId,
  },
  detail: Mixed,
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
  publicId: {
    type: String,
    unique: true,
  },
});

VideoSchema.pre<IVideo>('save', function(next) {
  if (!this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

export default mongoose.model<IVideo>('Video', VideoSchema);
