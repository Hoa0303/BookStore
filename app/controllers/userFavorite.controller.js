const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserFavorite = require("../services/userFavorite.service");

///Add favorite
exports.add = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;
        const userFavorite = new UserFavorite(MongoBD.client);
        const newFavorite = await userFavorite.addFavorite(userId, bookId);
        res.status(200).json({ message: "Favorite added successfully", favoriteId: newFavorite });
    } catch (error) {
        res.status(500).json({ error: "Failed to add favorite" });
    }
}

//FindAll Favorite
exports.findAll = async (req, res) => {
    const userId = req.params.id;
    const userFavoriteService = new UserFavorite(MongoBD.client);
    try {
        const bookId = await userFavoriteService.findAll(userId);
        res.status(200).json({ bookId: bookId });
    } catch (error) {
        res.status(500).json({ error: "Failed to find user's favorites" });
    }
};

//Delete Book Favorite
exports.delete = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;
        const userFavorite = new UserFavorite(MongoBD.client);
        const result = await userFavorite.removeFavorite(userId, bookId);

        if (result) {
            return res.send({ message: "Book was deleted!" });
        }
        return next(new ApiError(400, "Book not found"));

    } catch (error) {
        return next(new ApiError(500, "Could not delete book"));
    }
};