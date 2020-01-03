import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
    CommentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
