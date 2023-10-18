const AuthModel = require('../models/auth.model.js');

class UserService { 
    static async findUserById(id) {
        return AuthModel.findUserById(id);
    }
}

module.exports = UserService;