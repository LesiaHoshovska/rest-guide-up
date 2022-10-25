const CommentService = require('../../services/comment.service');
const Comment = require('../../models/comment.model');

const commentServiceFactory = () => {
  return new CommentService(Comment);
 };

module.exports = commentServiceFactory;


