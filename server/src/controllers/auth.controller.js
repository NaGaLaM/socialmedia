const AuthService = require('../services/auth.service.js');


class AuthController {

    static async register(req, res, next) {
        try {
            const { surname, password, email, name } = req.body;
            const user = await AuthService.register({ surname, password, email, name });
            if (user.error) {
                res.send({error:user.error});
            } else {
                console.log(`user created successfully!`);
                res.send(user);
            }
        } catch (error) {
            console.log(error, 'error in creating account');
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login({ email, password });
            if(data.error){
                res.send(data.error);
            }else{
                res.send(data);
            }
        } catch (error) {
            
        }
    }

}

module.exports = AuthController;