const bcrypt = require('bcrypt');
const AuthModel = require('../models/auth.model.js');
const { v4 } = require('uuid');

class AuthService {

    static async register(payload) {
        let { password } = payload;
        password = await bcrypt.hash(password, 3);
        payload.password = password;
        payload.activationLink = v4();
        return AuthModel.register(payload);
    }

    static async login(payload) {
        const user = await AuthModel.login(payload.email);
        if (user[0]) {
            const p = await bcrypt.compare(payload.password, user[0].password);
            if (p) {
                return user[0];
            } else {
                return { error: `password is incorrect!` };
            }
        } else {
            return { error: `username is incorrect!` };
        }
    }

}

module.exports = AuthService;