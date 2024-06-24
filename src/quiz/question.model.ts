export class Question {
  constructor(
    public id: number,
    public question: string,
    public options: string[],
    public correctAnswer: string,
    public category: string,
  ) {}
}
