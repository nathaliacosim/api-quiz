import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './question.schema';
import { Category } from './category.schema';
import { CreateQuestionDto } from './create-question.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
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

  async createQuestions(questions: CreateQuestionDto[]): Promise<Question[]> {
    const createdQuestions = await this.questionModel.insertMany(questions);
    for (const question of questions) {
      const existingCategory = await this.categoryModel
        .findOne({ name: question.category })
        .exec();
      if (!existingCategory) {
        const newCategory = new this.categoryModel({ name: question.category });
        await this.categoryModel.create(newCategory);
      }
    }
    return createdQuestions;
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

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
