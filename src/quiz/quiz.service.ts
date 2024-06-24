import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
  ) {}

  async getAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async getQuestionById(id: string): Promise<Question> {
    return this.questionModel.findById(id).exec();
  }

  async getQuestionsByCategory(category: string): Promise<Question[]> {
    return this.questionModel.find({ category }).exec();
  }

  async createQuestions(questions: Question[]): Promise<Question[]> {
    return this.questionModel.create(questions);
  }

  async updateQuestion(id: string, question: Question): Promise<Question> {
    return this.questionModel
      .findByIdAndUpdate(id, question, { new: true })
      .exec();
  }

  async deleteQuestion(id: string): Promise<boolean> {
    const result = await this.questionModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
