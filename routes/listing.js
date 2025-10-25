const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner , validateListing, isLoggedInForDelete,isLoggedInForEdit}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer = require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({storage  });

//Index Route //create route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)  
);
    
// create New route..// create crud  opera..
router.get("/new",isLoggedIn, listingController.renderNewForm);

//show Route//read crud opera. // update route // delete router
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedInForDelete,isOwner,wrapAsync(listingController.deleteListing));

// Edit Route
router.get("/:id/edit",
    isLoggedInForEdit,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;