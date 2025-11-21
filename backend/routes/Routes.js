const express = require("express");
const { getclaim } = require("../controllers/controller");
const router = express.Router();

router.get("/claim", getclaim);

module.exports = router;
