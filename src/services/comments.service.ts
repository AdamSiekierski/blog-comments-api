import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from '../interfaces/comment.interface';
import { CreateCommentDto } from '../interfaces/createComment.dto';
import { DeleteCommentDto } from '../interfaces/deleteComment.dto';

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
      content: commentData.content,
      replies: [],
    });

    await comment.save();

    return comment;
  }

  async addAsReply(commentData: CreateCommentDto) {
    const parent = await this.commentModel.findById(commentData.reply_to);
    if (!parent) {
      return {};
    } else {
      const comment = new this.commentModel({
        post_id: parent.post_id,
        date: new Date(),
        author: commentData.author,
        content: commentData.content,
      });

      parent.replies.push(comment);

      await parent.save();

      return comment;
    }
  }

  async deleteComment(commentData: DeleteCommentDto) {
    const comment = await this.commentModel.findOne({
      post_id: commentData.post_id,
      _id: commentData.comment_id,
    });
    if (!comment) {
      const parent = await this.commentModel.findOne({
        'replies._id': Types.ObjectId(commentData.comment_id),
        'post_id': commentData.post_id,
      });
      if (!parent) {
        return {
          error: `Cannot find comment with given id ${commentData.comment_id} for post ${commentData.post_id}`,
        };
      }
      parent.replies = parent.replies.filter(item => item._id.toString() !== commentData.comment_id);
      await parent.save();
    } else {
      await comment.delete();
    }
    return {
      message: 'Successfully deleted comment',
    };
  }
}
