import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuestionDto } from './create-question.dto';
import { Question } from './question.schema';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuestions() {
    return this.quizService.getAllQuestions();
  }

  @Get('categories')
  async getAllCategories() {
    return this.quizService.getAllCategories();
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return this.quizService.getQuestionById(id);
  }

  @Get('category/:category')
  @ApiQuery({ name: 'category', required: true })
  async getQuestionsByCategory(@Param('category') category: string) {
    return this.quizService.getQuestionsByCategory(category);
  }

  @Post()
  async createQuestions(@Body() questions: CreateQuestionDto[]) {
    return this.quizService.createQuestions(questions);
  }

  @Put(':id')
  async updateQuestion(@Param('id') id: string, @Body() question: Question) {
    return this.quizService.updateQuestion(id, question);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.quizService.deleteQuestion(id);
  }

  @Get('categories/:category/questions')
  async getRandomQuestionsByCategory(
    @Param('category') category: string,
  ): Promise<Question[]> {
    const questions = await this.quizService.getRandomQuestionsByCategory(category, 10);
    return questions;
  }
}
