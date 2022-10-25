const express = require('express');
const NotFoundError = require('../utils/errors/not.found.error');
const DeleteError = require('../utils/errors/delete.error');
const SavingError = require('../utils/errors/saving.error');
const NotFoundPosts = require('../utils/errors/not.found.posts.error');

/**
 * Class representing a functionality for the post route post functionality.
 */
class PostService {
  /**
   * Create a PostService.
   * @param model - the model of posts in database.
   * @param commentService - instance of comment service.
   */
  constructor(model, commentService) {
    this.Model = model;
    this.commentService = commentService;
  }

  /**
   * Write the post to the database.
   * @return {object} The post object, saved in the database.
   */

  async create(title, body, userId) {
    try {
      const post = new this.Model({
        title,
        body,
        userId,
      });
      return await post.save();
    } catch (e) {
      throw new SavingError({ description: 'Can not save the post' });
    }
  }

  /**
   * Make a pagination.
   * @return {object} The object.
   */

  async getAll(limit = 10, page = 1) {
    try {
      const totalPostsNum = await this.Model.count();
      const pagesNum = Math.ceil(totalPostsNum / limit);
      const postsOnCurrPage = await this.Model.find().populate({
        path: 'commentIds',
        populate: { path: 'userId', select: 'email' },
      }).populate({ path: 'userId', select: 'name' }).skip((page - 1) * limit).limit(limit).populate('commentIds');
      return {
        docs: postsOnCurrPage,
        pages: pagesNum,
        page,
        total: totalPostsNum,
        limit,
      };
    } catch (e) {
      throw new NotFoundPosts({ description: 'Can\'t get posts' });
    }
  }

  /**
   * Get the post by the post id from the database with the comment's array and the user's data .
   * @return {object} The object of the post id.
   */

  async getById(id) {
    try {
      return await this.Model.findById(id).populate({
        path: 'commentIds',
        populate: { path: 'userId', select: 'email' },
      }).populate({ path: 'userId', select: 'name' });
    } catch (e) {
      throw new NotFoundError({ description: 'Can\'t find the post' });
    }
  }

  /**
   * Update the post to the database.
   * @return {object} The post object, updated in the database.
   */

  async update(id, title, body) {
    try {
      const post = {
        title,
        body,
      };
      return await this.Model.findByIdAndUpdate(id, post, { new: true });
    } catch (e) {
      throw new SavingError({ description: 'Can\'t save the post' });
    }
  }

  /**
   * Delete post from the database.
   * @return {object} The deleted object.
   */

  async delete(id) {
    try {
      const deletedPost =  await this.Model.findOneAndDelete({ _id: id });
      const idsToBeDeleted = deletedPost.commentIds.map((comment) => comment._id)
      await this.commentService.deleteMany(idsToBeDeleted);
      return deletedPost
    } catch (e) {
      throw new DeleteError({ description: 'Cant delete the post' });
    }
  }

  async createComment(body, postId, userId){
    try {
      const comment = await this.commentService.create(body, userId);
      const post = await this.Model.findOne({_id: postId});
      post.commentIds.push(comment);
      await post.save();
      return comment
    }catch (e) {
      throw new SavingError({ description: 'Can not save the post' });
    }
  }

  async deleteComment(postId, commentId){
   try {
     const post = await this.Model.findById(postId);
     post.commentIds.pull(commentId);
     await post.save();
     return await this.commentService.delete(commentId);
   }catch (e) {
     throw new DeleteError({ description: 'Cant delete the comment in posts arr' });
   }
  }
}

module.exports = PostService;
