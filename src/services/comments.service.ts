import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from '../interfaces/comment.interface';
import { CreateCommentDto } from '../interfaces/createComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async findForPost(postId: string) {
    return await this.commentModel.find({ post_id: postId });
  }

  async addForPost(commentData: CreateCommentDto) {
    const comment = new this.commentModel({
      post_id: commentData.post_id,
      date: new Date(),
      author: commentData.author,
      content: commentData.author,
      replies: [],
    });

    await comment.save();

    return comment;
  }
}
