const UserService = require('../services/user.service.js');

class UserController {
    static async findUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await UserService.findUserById(id);
            res.send(user[0]);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = UserController;