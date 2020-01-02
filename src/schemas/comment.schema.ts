import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  post_id: String,
  date: Date,
  author: String,
  content: String,
  replies: [this],
});
