const { ObjectId } = require("mongodb");

class UserFavorite {
    constructor(client) {
        this.UserFavorite = client.db().collection("user_favorites");
    }

    extractUserFavoritesData(payload) {
        const userfavorite = {
            userId: payload.userId,
            bookId: payload.bookId,
        };
    }

    async addFavorite(userId, bookId) {
        try {
            const existingFavorite = await this.UserFavorite.findOne({ userId: userId });

            if (existingFavorite) {
                const updatedFavorite = await this.UserFavorite.findOneAndUpdate(
                    { userId: userId },
                    { $addToSet: { bookId: bookId } },
                    { returnDocument: "after" }
                );
                return updatedFavorite._id.toString();
            } else {
                const userFavoriteData = {
                    userId: userId,
                    bookId: [bookId]
                };
                const result = await this.UserFavorite.insertOne(userFavoriteData);
                return result.insertedId.toString();
            }
        } catch (error) {
            throw new Error("Failed to add favorite");
        }
    }

    async findAll(userId) {
        try {
            const userFavorite = await this.UserFavorite.findOne({ userId: userId });
            if (!userFavorite) {
                return [];
            }
            return userFavorite.bookId;
        } catch (error) {
            throw new Error("Failed to find user's favorites");
        }
    }

    async removeFavorite(userId, bookIdToRemove) {
        try {
            await this.UserFavorite.findOneAndUpdate(
                { userId: userId },
                { $pull: { bookId: bookIdToRemove } },
                { returnDocument: "after" }
            );
            return true;
        } catch (error) {
            throw new Error("Failed to remove favorite");
        }
    }

}

module.exports = UserFavorite;