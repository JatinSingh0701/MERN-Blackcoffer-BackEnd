const router = require("express").Router();
const dataController = require("../controllers/API.controller.js");


// Getting all the data from the database
router.get("/api", dataController.apiData);

// Getting a keys data from the database
router.get("/api/:key", dataController.apiDataKey);

module.exports = router;
