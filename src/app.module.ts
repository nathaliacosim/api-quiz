import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModule } from './quiz/quiz.module';
import { CorsMiddleware } from './cors.middleware';
import { join } from 'path';

dotenv.config();
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUser || !dbPassword) {
  throw new Error(
    'Variáveis de ambiente DB_USER ou DB_PASSWORD não definidas.',
  );
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'uploads'),
      serveRoot: '/api/uploads/',
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.44rmp7i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    QuizModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
