import { Schema, Document, model } from 'mongoose';

export interface Question extends Document {
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

export const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  category: { type: String, required: true },
});

export const QuestionModel = model<Question>('Question', QuestionSchema);
