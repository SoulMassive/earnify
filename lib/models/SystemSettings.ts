import mongoose from 'mongoose';

const SystemSettingsSchema = new mongoose.Schema({
  marketplaceEnabled: { 
    type: Boolean, 
    default: true 
  },
  autoSubmissionEnabled: { 
    type: Boolean, 
    default: false 
  },
  maintenanceMode: { 
    type: Boolean, 
    default: false 
  },
  updatedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, { timestamps: true });

export const SystemSettings = mongoose.models.SystemSettings || mongoose.model('SystemSettings', SystemSettingsSchema);
