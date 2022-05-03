import { Schema, model } from 'mongoose';

interface ICategory {
    name: string;
    description: string;
}

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: String,
}, { timestamps: true });

const Category = model<ICategory>('Categories', categorySchema);

export default Category;




