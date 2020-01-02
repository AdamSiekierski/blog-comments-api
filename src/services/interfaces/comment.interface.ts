export interface Comment {
  post_id: string;
  date: Date;
  author: string;
  content: string;
  replies: Comment[];
}
