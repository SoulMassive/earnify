import mongoose from 'mongoose';
import './Opportunity';
import './User';

const ConversationSchema = new mongoose.Schema({
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Applied', 'In Discussion', 'In Progress', 'Submitted', 'Approved', 'Rejected'],
    default: 'Applied',
  },
  lastMessage: {
    type: String,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  unreadCount: {
    student: { type: Number, default: 0 },
    admin: { type: Number, default: 0 },
  }
}, { timestamps: true });

export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
