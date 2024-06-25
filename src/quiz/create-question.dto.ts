import { IsString, IsArray } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  questionText: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  correctAnswer: string;

  @IsString()
  category: string;
}
