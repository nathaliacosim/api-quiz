import { Schema, Document } from 'mongoose';

export const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  category: { type: String, required: true },
});

export interface Question extends Document {
  id?: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  category: string;
}
