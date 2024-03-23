const { ObjectId } = require("mongodb");

class AuthService {
    constructor(client) {
        this.Auth = client.db().collection("users");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractAuthData(payload) {
        const auth = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            address: payload.address,
            phone: payload.phone,
            role: payload.role,
        };

        // Remove undefined fields
        Object.keys(auth).forEach(
            (key) => auth[key] === undefined && delete auth[key]
        );

        return auth;
    }

    async create(payload) {
        const auth = this.extractAuthData(payload);
        auth.role = false;
        const result = await this.Auth.findOneAndUpdate(
            { email: auth.email },
            { $set: { ...auth } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async login(payload) {
        const auth = this.extractAuthData(payload);
        const user = await this.Auth.findOne(
            { email: auth.email },
            { password: auth.password }
        );

        if (user) {
            if (user.role === false) {
                return user._id.toString();
            } else {
                return "This is admin";
            }
        } else {
            return null;
        }
    }

    async findById(id) {
        return await this.Auth.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async find(filter) {
        const cursor = await this.Auth.find(filter);
        return await cursor.toArray();
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractAuthData(payload);
        const result = await this.Auth.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }
}

module.exports = AuthService;