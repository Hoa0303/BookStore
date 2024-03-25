const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const authRouter = require("./app/routes/auth.route");
const bookRouter = require("./app/routes/book.route");
const userFavorite = require('./app/routes/userFavorite.route');
const borrowedBooks = require('./app/routes/borrowed_books.route');
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/user", authRouter);
app.use("/api/book", bookRouter);
app.use("/api/favorite", userFavorite);
app.use("/api/borrow", borrowedBooks);


app.get('/', (req, res) => {
    res.json({ message: "Welcome to contact Book Store. " });
});

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

module.exports = app;