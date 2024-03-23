const express = require("express");
const userFavorite = require("../controllers/userFavorite.controller");

const router = express.Router();

router.route('/:id')
    .post(userFavorite.add)
    .get(userFavorite.findAll)
    .delete(userFavorite.delete);

module.exports = router;