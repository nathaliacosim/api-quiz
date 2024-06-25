import { Schema, Document } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true },
});

export interface Category extends Document {
  id?: string;
  name: string;
}
