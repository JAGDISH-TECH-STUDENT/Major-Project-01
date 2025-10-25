const express = require("express");
const router= express.Router({ mergeParams: true }); 

const wrapAsync = require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview,isLoggedIn,isReviewAuthor }=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

// review //post route
router.post("/",isLoggedIn,validateReview,wrapAsync
    (reviewController.createReview));

// delete router for review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

// app.get("/testListing",async (req,res)=>{
//     let sampleListing =new Listing({
//         title: "My New Villa",
//         description: "By the beach",
//         price: 1200,
//         location:"Calangute, Goa",
//         country: "India",

//     });

//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("successful");
// });


module.exports =router;