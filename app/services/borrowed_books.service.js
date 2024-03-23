const { ObjectId } = require("mongodb");

class BorrowBooks {
    constructor(client) {
        this.BorrowBooks = client.db().collection("borrowed_books");
    }

    extractBorrowBooksData(payload) {
        const borrowBooks = {
            userId: payload.userId,
            ngayMuon: payload.ngayMuon,
            ngayTra: payload.ngayTra,
            books: payload.books,
            status: payload.status,
        };
    }

    async addBorrow(userId, ngayMuon, ngayTra, books = []) {
        try {
            const borrowEntry = {
                userId: userId,
                ngayMuon: ngayMuon,
                ngayTra: ngayTra,
                status: "Đang đợi duyệt",
                books: books
            };

            const result = await this.BorrowBooks.insertOne(borrowEntry);

            return result.insertedId;
        } catch (error) {
            console.error("Error adding borrow:", error);
            throw error;
        }
    }

    async findById(userId) {
        try {
            const query = { userId: userId };
            const borrowedList = await this.BorrowBooks.find(query).toArray();
            return borrowedList;
        } catch (error) {
            console.error("Error finding borrowed books by userId:", error);
            throw error;
        }
    }

    async find(filter) {
        const cursor = await this.BorrowBooks.find(filter);
        return await cursor.toArray();
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = {
            ...payload // Sử dụng trực tiếp dữ liệu từ payload
        };
        try {
            const result = await this.BorrowBooks.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );
            return result;
        } catch (error) {
            console.error("Error updating borrowed book:", error);
            throw error;
        }
    }



}
module.exports = BorrowBooks;