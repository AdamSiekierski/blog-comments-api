import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../interfaces/createComment.dto';
import { DeleteCommentDto } from '../interfaces/deleteComment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  commentsRoot(): object {
    return {
      message: `Welcome to adamsiekierski's blog comments api`,
    };
  }

  @Get(':id')
  async commentsForPost(@Req() request: Request): Promise<object> {
    return await this.commentsService.findForPost(request.params.id);
  }

  @Post('add')
  async addComment(
    @Body() createCommentDto: CreateCommentDto,
    @Res() response: Response,
  ): Promise<object> {
    if (createCommentDto.reply_to) {
      const comment = await this.commentsService.addAsReply(createCommentDto);
      if (!comment._id) {
        return response.status(400).json({
          message: `Cannot reply to comment with id: ${createCommentDto.reply_to}`,
        });
      } else {
        return response.json({
          message: 'Reply successfully added',
          comment,
        });
      }
    } else {
      const comment = await this.commentsService.addForPost(createCommentDto);
      return response.json({ message: 'Comment successfully added', comment });
    }
  }

  @Post('delete')
  async deleteComment(
    @Body() deleteCommentDto: DeleteCommentDto,
    @Res() response: Response,
  ): Promise<object> {
    const res = await this.commentsService.deleteComment(deleteCommentDto);
    if (res.error) {
      return response.status(400).json(res);
    } else {
      return response.json(res);
    }
  }
}
