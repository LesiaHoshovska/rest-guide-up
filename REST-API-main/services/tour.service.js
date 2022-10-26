const express = require("express");
const NotFoundError = require("../utils/errors/not.found.error");
const DeleteError = require("../utils/errors/delete.error");
const SavingError = require("../utils/errors/saving.error");
const NotFoundTourError = require("../utils/errors/not.found.tours.error");

class TourService {
  constructor(model, commentService) {
    this.Model = model;
    this.commentService = commentService;
  }

  async create(title, body, userId) {
    try {
      const tour = new this.Model({
        title,
        body,
        userId,
      });
      return await tour.save();
    } catch (e) {
      throw new SavingError({ description: "Can not save the post" });
    }
  }

  async getAll(limit = 10, page = 1) {
    try {
      const totalToursNum = await this.Model.count();
      const pagesNum = Math.ceil(totalToursNum / limit);
      const toursOnCurrPage = await this.Model.find()
        .populate({
          path: "commentIds",
          populate: { path: "userId", select: "email" },
        })
        .populate({ path: "userId", select: "name" })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("commentIds");
      return {
        docs: toursOnCurrPage,
        pages: pagesNum,
        page,
        total: totalToursNum,
        limit,
      };
    } catch (e) {
      throw new NotFoundTourError({ description: "Can't get posts" });
    }
  }

  async getById(id) {
    try {
      return await this.Model.findById(id)
        .populate({
          path: "commentIds",
          populate: { path: "userId", select: "email" },
        })
        .populate({ path: "userId", select: "name" });
    } catch (e) {
      throw new NotFoundError({ description: "Can't find the tour" });
    }
  }

  async update(id, title, body) {
    try {
      const tour = {
        title,
        body,
      };
      return await this.Model.findByIdAndUpdate(id, tour, { new: true });
    } catch (e) {
      throw new SavingError({ description: "Can't save the tour" });
    }
  }

  async delete(id) {
    try {
      const deletedTour = await this.Model.findOneAndDelete({ _id: id });
      const idsToBeDeleted = deletedTour.commentIds.map(
        (comment) => comment._id
      );
      await this.commentService.deleteMany(idsToBeDeleted);
      return deletedTour;
    } catch (e) {
      throw new DeleteError({ description: "Cant delete the post" });
    }
  }

  async createComment(body, tourId, userId) {
    try {
      const comment = await this.commentService.create(body, userId);
      const tour = await this.Model.findOne({ _id: tourId });
      tour.commentIds.push(comment);
      await tour.save();
      return comment;
    } catch (e) {
      throw new SavingError({ description: "Can not save the post" });
    }
  }

  async deleteComment(tourId, commentId) {
    try {
      const tour = await this.Model.findById(tourId);
      tour.commentIds.pull(commentId);
      await tour.save();
      return await this.commentService.delete(commentId);
    } catch (e) {
      throw new DeleteError({
        description: "Cant delete the comment in tours arr",
      });
    }
  }
}

module.exports = TourService;
