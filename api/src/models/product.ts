
import { Schema, model } from 'mongoose';

interface IProduct {
    name: string;
    category: string;
    note: string;
    image: string;
    toJSON: () => void
}

const ProductSchema = new Schema({
    name: { type: String, trim: true },
    category: { type: String, trim: true },
    note: String,
    image: { type: String, trim: true },
}, { timestamps: true });


ProductSchema.statics.getByCategory = async function (category: string) {
    return this.where('category', new RegExp(category, 'i')).exec();
}
const Product = model<IProduct>('Products', ProductSchema);

export default Product;