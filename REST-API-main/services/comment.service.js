require('express');
const DeleteError = require('../utils/errors/delete.error');
const SavingError = require('../utils/errors/saving.error');

/**
 * Class representing a functionality for the post route comments functionality.
 */
class CommentService {
  /**
   * Create the CommentService.
   * @param model - the model of the entity in database.
   */
  constructor(model) {
    this.Model = model;
  }

  /**
   * Write the comment to the database.
   * @return {object} The post object, saved in the database.
   */

  async create(body, userId) {
    try {
      const comment = new this.Model({ body, userId });
      return await comment.save();
    } catch (e) {
      return new SavingError({ description: 'Can not save the comment' });
    }
  }

  /**
   * Update the comment to the database.
   * @return {object} The post object, updated in the database.
   */

  async update(id, body) {
    try {
      const comment = {
        body,
      };
      return await this.Model.findByIdAndUpdate(id, comment, { new: true });
    } catch (e) {
      return new SavingError({ description: 'Can\'t save the comment' });
    }
  }

  /**
   * Delete post from the database.
   * @return {object} The deleted object.
   */

  async delete(id) {
    try {
      return await this.Model.findOneAndDelete({ _id: id });
    } catch (e) {
      throw new DeleteError({ description: 'Cant delete the comment' });
    }
  }

  async deleteMany(idsToBeDeleted) {
    await this.Model.deleteMany({
      _id: { $in: idsToBeDeleted },
    });
  }
}

module.exports = CommentService;
