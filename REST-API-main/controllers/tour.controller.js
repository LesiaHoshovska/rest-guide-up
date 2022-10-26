const express = require("express");

const router = express.Router();

const tourValidator = require("../utils/validators/tour-validators/tour.add.validator");
const tourUpdateValidator = require("../utils/validators/tour-validators/tour.update.validator");
const commentValidator = require("../utils/validators/comment-validators/comment.add.validator");
const commentUpdateValidator = require("../utils/validators/comment-validators/comment.update.validator");
const tourServiceFactory = require("../utils/factory/tour.service.factory");
const commentServiceFactory = require("../utils/factory/comment.service.factory");

router.post(
  "/",
  (req, res, next) => {
    tourValidator(req.body);
    next();
  },
  async (req, res, next) => {
    try {
      const tourService = tourServiceFactory();
      const newTour = await tourService
        .create
        //req.body.title,
        //req.body.body,
        //req.body.userId
        ();
      res.status(200).json(newTour);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const tourService = tourServiceFactory();
    const { limit, page } = req.query;
    const tours = await tourService.getAll(limit, page);
    res.status(200).json(tours);
  } catch (e) {
    next(e);
  }
});

router.get("/:tourId", async (req, res, next) => {
  try {
    const tourService = tourServiceFactory();
    const { tourId } = req.params;
    const tourInfo = await tourService.getById(tourId);
    res.status(200).json(tourInfo);
  } catch (e) {
    next(e);
  }
});

router.put(
  "/:tourId",
  (req, res, next) => {
    tourUpdateValidator(req.body);
    next();
  },
  async (req, res, next) => {
    try {
      const tourService = tourServiceFactory();
      const { tourId } = req.params;
      const { body, title } = req.body;
      const updatedTour = await tourService.update(tourId, title, body);
      res.status(200).json(updatedTour);
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:tourId", async (req, res, next) => {
  try {
    const tourService = tourServiceFactory();
    const { tourId } = req.params;
    const deletedTour = await tourService.delete(tourId);
    res.status(200).json(deletedTour);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/:tourId/comments",
  (req, res, next) => {
    commentValidator(req.body);
    next();
    // eslint-disable-next-line consistent-return
  },
  async (req, res, next) => {
    try {
      const tourService = tourServiceFactory();
      const { body, userId } = req.body;
      const { tourId } = req.params;
      const newComment = await tourService.createComment(body, tourId, userId);
      return res.status(201).json(newComment);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:tourId/comments/:commentId",
  (req, res, next) => {
    commentUpdateValidator(req.body);
    next();
    // eslint-disable-next-line consistent-return
  },
  async (req, res, next) => {
    try {
      const commentService = commentServiceFactory();
      const { commentId } = req.params;
      const { body } = req.body;
      const updatedComment = await commentService.update(commentId, body);
      return res.status(200).json(updatedComment);
    } catch (e) {
      next(e);
    }
  }
);

// eslint-disable-next-line consistent-return
router.delete("/:tourId/comments/:commentId", async (req, res, next) => {
  try {
    const { tourId, commentId } = req.params;
    const tourService = tourServiceFactory();
    const deletedComment = await tourService.deleteComment(tourId, commentId);
    return res.status(200).json(deletedComment);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
