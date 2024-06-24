import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Question } from './question.schema';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  async getAllQuestions(): Promise<Question[]> {
    return this.quizService.getAllQuestions();
  }

  @Get('category/:category')
  async getQuestionsByCategory(
    @Param('category') category: string,
  ): Promise<Question[]> {
    return this.quizService.getQuestionsByCategory(category);
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.quizService.getQuestionById(id);
  }

  @Post()
  async createQuestions(@Body() questions: Question[]): Promise<Question[]> {
    return this.quizService.createQuestions(questions);
  }

  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() question: Question,
  ): Promise<Question> {
    return this.quizService.updateQuestion(id, question);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string): Promise<boolean> {
    return this.quizService.deleteQuestion(id);
  }
}
