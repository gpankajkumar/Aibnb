const express = require("express");
const Review = require("../models/review.js");


const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const reviewControllar = require("../controllers/reviewss.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn,  isReviewOuthor} = require("../middleware.js");

// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewControllar.postReview));

// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewOuthor, wrapAsync(reviewControllar.deleteReview));

module.exports = router;