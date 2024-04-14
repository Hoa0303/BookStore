const express = require("express");
const publisher = require("../controllers/publisher.controller");

const router = express.Router();

router.route('/add')
    .post(publisher.create);

router.route('/')
    .get(publisher.findAll);

router.route('/:id')
    .get(publisher.findById)
    .post(publisher.update)
    .delete(publisher.delete);

module.exports = router;