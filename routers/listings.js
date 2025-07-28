const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js");

const listingControllar = require("../controllers/listingss.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router.get("/new", isLoggedIn, listingControllar.renderNewForm);

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllar.renderEditForm));



router.route("/")
    .get(wrapAsync(listingControllar.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControllar.createListing));




router.route("/:id")
    .get(wrapAsync(listingControllar.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"),validateListing, wrapAsync(listingControllar.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllar.deleteRoyListing));

module.exports = router;
