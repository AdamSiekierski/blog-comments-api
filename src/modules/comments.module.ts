import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController} from '../controllers/comments.controller';
import { CommentSchema } from '../schemas/comment.schema';
import { CommentsService } from '../services/comments.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
