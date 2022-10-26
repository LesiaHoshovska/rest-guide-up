const TourService = require("../../services/tour.service");
const Tour = require("../../models/tour.model");
const commentServiceFactory = require("./comment.service.factory");

const tourServiceFactory = () => {
  return new TourService(Tour, commentServiceFactory());
};

module.exports = tourServiceFactory;
