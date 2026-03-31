import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide a category name.'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  icon: { 
    type: String, 
    default: 'LayoutGrid' // Default lucide-react icon
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  potential: {
    type: String,
    default: '₹5,000–₹15,000/month'
  },
  opportunityCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Pre-save hook to generate slug
CategorySchema.pre('save', function(this: any, next: any) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
  next();
});

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
