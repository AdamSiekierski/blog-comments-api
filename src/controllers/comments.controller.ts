import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../interfaces/createComment.dto';

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
  async addCommentForPost(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<object> {
    const comment = await this.commentsService.addForPost(createCommentDto);
    return { message: 'Comment successfully added', comment };
  }
}
