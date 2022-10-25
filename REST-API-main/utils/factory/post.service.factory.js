const PostService = require('../../services/post.service');
const Post = require('../../models/post.model');
const commentServiceFactory = require('./comment.service.factory');

const postServiceFactory = () => {
  return new PostService( Post, commentServiceFactory());
  };

module.exports = postServiceFactory;
