import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    maxlength: [60, 'Name cannot be more than 60 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
  },
  balance: {
    type: Number,
    default: 0,
  },
  points: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: 'https://github.com/shadcn.png',
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  rank: {
    type: String,
    default: 'Bronze',
  },
}, { timestamps: true });

// Check if the model is already exists in development (prevent overwrite)
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
