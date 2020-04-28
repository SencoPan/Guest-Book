const { User } = require('../models');
const bCrypt = require('bcrypt');

module.exports = {
    register: async (username, password) => {

        try{
            let user = await User.findOne({
                where: {
                    username
                }
            });
            if(user){
               return {error: "User name is taken"}
            }
            const hashedPassword = await bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            return await User.create({
                username,
                password: hashedPassword
            });
        } catch (error) {
            return error;
        }
    },
    login: async (username, password) => {
        const user = await User.findOne({
            where: {
                username
            },
        });
        if(!user) {
            return {error: "User was not found"}
        }
        if(!(await bCrypt.hashSync(password, user.password))){
            return {error: "Incorrect username/login"}
        }
        return user
    },
    getAll: async (req, res) => {
        const users = await User.findAll({
            order: [['createdAt', 'DESC']],
            attributes: ["username", "createdAt"]
        });

        if(!users) {
            return {
                message: "No any users was found"
            }
        } else {
            return {
                users
            }
        }
    }
};