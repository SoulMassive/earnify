import mongoose from 'mongoose';
import './Conversation';

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  senderRole: {
    type: String,
    enum: ['student', 'admin'],
    required: true,
  },
  messageText: {
    type: String,
    required: false,
    default: ''
  },
  fileUrl: {
    type: String,
    default: null
  },
  workLink: {
    type: String,
    default: null
  },
  attachments: [String],
  readStatus: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
