const AuthService = require("../services/auth.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Create and Save a new User
exports.register = async (req, res, next) => {
    if (!req.body?.name || !req.body?.email || !req.body?.password || !req.body?.phone) {
        return next(new ApiError(400, "Nhập đầy đủ thông tin yêu cầu!"));
    }

    try {
        const authService = new AuthService(MongoBD.client);
        const document = await authService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

//Login with email and password
exports.login = async (req, res, next) => {
    try {
        const authService = new AuthService(MongoBD.client);
        const document = await authService.login(req.body);
        if (document) {
            return res.send(document);
        }
        else {
            return next(new ApiError(400, "Tài khoản hoặc mật khẩu không chính xác!"));
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

//Update information of user
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }

    try {
        const authService = new AuthService(MongoBD.client);
        const document = await authService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "User not found"));
        }
        return res.send({ message: "User was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating user with id=${req.params.id}`)
        );
    }
};

//Find user by ID
exports.findById = async (req, res, next) => {
    try {
        const authService = new AuthService(MongoBD.client);
        const document = await authService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "User not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving user with id=${req.params.id}`));
    }
};

//Find all user
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const authService = new AuthService(MongoBD.client);
        documents = await authService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An errer occured while retrieving users")
        );
    }
    return res.send(documents);
};