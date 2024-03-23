const express = require("express");
const borrowBooks = require("../controllers/borrowed_books.controller");

const router = express.Router();

router.route('/:id')
    .post(borrowBooks.create)
    .put(borrowBooks.update)
    .get(borrowBooks.findOne)

router.route('')
    .get(borrowBooks.findAll);

module.exports = router;