export interface CreateCommentDto {
  post_id: string;
  author: string;
  content: string;
  reply_to: string;
}
