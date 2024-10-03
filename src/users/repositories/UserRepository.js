const User = require('../domain/User');

class UserRepository {
    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findById(id) {
        return await User.findById(id);
    }

    async findAll() {
        return await User.find();
    }

    async deleteById(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateById(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }
}

module.exports = new UserRepository();
