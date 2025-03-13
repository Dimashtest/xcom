const express = require("express")
const router = express.Router()
const { getAllFavourite, addFavourite} = require("../controllers/favouritesController")

router.get('/favourites/', getAllFavourite)
router.post("/favourites", addFavourite)

module.exports = router