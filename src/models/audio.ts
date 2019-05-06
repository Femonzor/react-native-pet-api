import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

interface IAudio extends mongoose.Document {
  author: {
    type: string;
    ref: 'User';
  };
  video: {
    type: string;
    ref: 'Video';
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

const AudioSchema = new mongoose.Schema({
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
  video: {
    ref: 'Video',
    type: ObjectId,
  },
});

AudioSchema.pre<IAudio>('save', function(next) {
  if (!this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

export default mongoose.model<IAudio>('Audio', AudioSchema);
