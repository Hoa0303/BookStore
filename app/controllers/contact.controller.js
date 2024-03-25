const ContactService = require("../services/contact.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// exports.create = (req, res) => {
//     res.send({ message: "create handler" });
// };

// exports.findAll = (req, res) => {
//     res.send({ message: "findAll handler" });
// };

// exports.findOne = (req, res) => {
//     res.send({ message: "findOne handler" });
// };

// exports.update = (req, res) => {
//     res.send({ message: "update handler" });
// };

// exports.delete = (req, res) => {
//     res.send({ message: "delete handler" });
// };

// exports.deleteAll = (req, res) => {
//     res.send({ message: "deleteAll handler" });
// };

// exports.findAllFavorite = (req, res) => {
//     res.send({ message: "findAllFavorite handler" });
// };

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name con not be empty"));
    }

    try {
        const contactService = new ContactService(MongoBD.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoBD.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An errer occured while retrieving contacts")
        );
    }
    return res.send(documents);
};

// Find contact with id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoBD.client);
        const document = await contactService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
    }
};

//Update a contact
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }

    try {
        const contactService = new ContactService(MongoBD.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

// Delete a contact
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoBD.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};

// Find all favorite 
exports.findAllFavorite = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoBD.client);
        const documents = await contactService.findFavorite();
        console.log(documents);
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "An error occured while retrieving favorite contacts"));
    }
};

// Delete all contacts
exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoBD.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
};