const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const UserFavorite = require("../services/userFavorite.service");

// exports.add = (req, res) => {
//     res.send({ message: "add favorite" });
// };

// exports.findAll = (req, res) => {
//     res.send({ message: "findAll favorite" });
// };


// exports.delete = (req, res) => {
//     res.send({ message: "delete favorite" });
// };

//Add favorite
exports.add = async (req, res, next) => {
    try {
        const userFavorite = new UserFavorite(MongoBD.client);
        const newFavorite = await userFavorite.addFavorite(req.params.id, req.body);
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
        const userId = req.params.id;
        const bookId = req.body.bookId;

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




//Create and Save a new Contact
// exports.create = async (req, res, next) => {
//     if (!req.body?.name) {
//         return next(new ApiError(400, "Name con not be empty"));
//     }

//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const document = await contactService.create(req.body);
//         return res.send(document);
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while creating the contact")
//         );
//     }
// };

// // Retrieve all contacts of a user from the database
// exports.findAll = async (req, res, next) => {
//     let documents = [];

//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const { name } = req.query;
//         if (name) {
//             documents = await contactService.findByName(name);
//         } else {
//             documents = await contactService.find({});
//         }
//     } catch (error) {
//         return next(
//             new ApiError(500, "An errer occured while retrieving contacts")
//         );
//     }
//     return res.send(documents);
// };

// // Find contact with id
// exports.findOne = async (req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const document = await contactService.findById(req.params.id);
//         if (!document) {
//             return next(new ApiError(400, "Contact not found"));
//         }
//         return res.send(document);
//     } catch (error) {
//         return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
//     }
// };

// //Update a contact
// exports.update = async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, "Data to update can not be emtpy"));
//     }

//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const document = await contactService.update(req.params.id, req.body);
//         if (!document) {
//             return next(new ApiError(404, "Contact not found"));
//         }
//         return res.send({ message: "Contact was update successfully" });
//     } catch (error) {
//         return next(
//             new ApiError(500, `Error updating contact with id=${req.params.id}`)
//         );
//     }
// };

// // Delete a contact
// exports.delete = async (req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const document = await contactService.delete(req.params.id);
//         if (!document) {
//             return next(new (404, "Contact not found"));
//         }
//         return res.send({ message: "Contact was deleted successfully" });
//     } catch (error) {
//         return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
//     }
// };

// // Find all favorite
// exports.findAllFavorite = async (_req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const documents = await contactService.findFavorite();
//         console.log(documents);
//         return res.send(documents);
//     } catch (error) {
//         return next(new ApiError(500, "An error occured while retrieving favorite contacts"));
//     }
// };

// // Delete all contacts
// exports.deleteAll = async (_req, res, next) => {
//     try {
//         const contactService = new ContactService(MongoBD.client);
//         const deleteCount = await contactService.deleteAll();
//         return res.send({
//             message: `${deleteCount} contacts were deleted successfully`,
//         });
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while removing all contacts")
//         );
//     }
// };