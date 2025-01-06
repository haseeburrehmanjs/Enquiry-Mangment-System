import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product



// https://docs.google.com/document/d/1UXq84v9hLcfz-KnxZ9-2D13oZwzpel7TfgmzZv1twO4/edit?tab=t.0
