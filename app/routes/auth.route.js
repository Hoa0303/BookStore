const express = require("express");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.route('/login')
    .get(auth.login);

router.route('/register')
    .post(auth.register);

router.route('/:id')
    .get(auth.findById)
    .put(auth.update);

router.route('/')
    .get(auth.findAll);

module.exports = router;