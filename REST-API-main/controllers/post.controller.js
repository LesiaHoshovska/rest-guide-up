const express = require('express');

const router = express.Router();

const postValidator = require('../utils/validators/user-validators/user.add.validator');
const postUpdateValidator = require('../utils/validators/user-validators/user.update.validator');
const commentValidator = require('../utils/validators/comment-validators/comment.add.validator');
const commentUpdateValidator = require('../utils/validators/comment-validators/comment.update.validator');
const postServiceFactory = require ('../utils/factory/post.service.factory');
const commentServiceFactory = require('../utils/factory/comment.service.factory');

router.post('/', (req, res, next) => {
  postValidator(req.body);
  next();
}, async (req, res, next) => {
  try {
    const postService = postServiceFactory();
    const newPost = await postService.create(req.body.title, req.body.body, req.body.userId);
    res.status(200).json(newPost);
  } catch (e) {
    next(e);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const postService = postServiceFactory();
    const { limit, page } = req.query;
    const posts = await postService.getAll(limit, page);
    res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
});

router.get('/:postId', async (req, res, next) => {
  try {
    const postService = postServiceFactory();
    const { postId } = req.params;
    const postInfo = await postService.getById(postId);
    res.status(200).json(postInfo);
  } catch (e) {
    next(e);
  }
});

router.put('/:postId', (req, res, next) => {
  postUpdateValidator(req.body);
  next();
}, async (req, res, next) => {
  try {
    const postService = postServiceFactory();
    const { postId } = req.params;
    const { body, title } = req.body;
    const updatedPost = await postService.update(postId, title, body);
    res.status(200).json(updatedPost);
  } catch (e) {
    next(e);
  }
});

router.delete('/:postId', async (req, res, next) => {
  try {
    const postService = postServiceFactory();
    const {postId} = req.params
    const deletedPost = await postService.delete(postId);
    res.status(200).json(deletedPost);
  } catch (e) {
    next(e);
  }
});

/**
 * @module router
 * write comment's object to the database and send the comment object
 */

router.post('/:postId/comments', (req, res, next) => {
  commentValidator(req.body);
  next();
// eslint-disable-next-line consistent-return
}, async (req, res, next) => {
  try {
    const postService = postServiceFactory();
    const { body, userId } = req.body;
    const { postId } = req.params;
    const newComment = await postService.createComment(body, postId, userId);
    return res.status(201).json(newComment);
  } catch (e) {
    next(e);
  }
});

router.put('/:postId/comments/:commentId', (req, res, next) => {
  commentUpdateValidator(req.body);
  next();
// eslint-disable-next-line consistent-return
}, async (req, res, next) => {
  try {
    const commentService = commentServiceFactory();
    const { commentId } = req.params;
    const { body } = req.body;
    const updatedComment = await commentService.update(commentId, body);
    return res.status(200).json(updatedComment);
  } catch (e) {
    next(e);
  }
});

// eslint-disable-next-line consistent-return
router.delete('/:postId/comments/:commentId', async (req, res, next) => {
  try {
    const {postId, commentId} = req.params
    const postService = postServiceFactory();
    const deletedComment = await postService.deleteComment(postId, commentId);
    return res.status(200).json(deletedComment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
