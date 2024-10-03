const UserRepository = require('../repositories/UserRepository');

class UpdateUser {
    async execute(id, userData) {
        const user = await UserRepository.updateById(id, userData);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    }
}

module.exports = new UpdateUser();
