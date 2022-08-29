var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/splash", function (req, res) {
    res.sendFile("splash.ejs", {root: "./views"});
});

/* Pressing the 'PLAY' button, returns this page */
router.get("/game", function(req, res) {
    res.sendFile("game.html", {root: "./public"});
});

module.exports = router;