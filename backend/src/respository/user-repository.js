const { Error } = require('mongoose');
const User = require('../models/user')
const bcrypt = require('bcrypt');
class UserRepository {
    constructor(){}

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("something wrong in repository");
            throw error;
        }
    }

    async find(data){
        try {
           const user = await User.findOne({email : data.email});
           if(!user) {
                throw new Error("user not registered");
           }
           const password = bcrypt.compareSync(data.password,user.password);
           if(!password){
                throw new Error("password not correct");
           }
           const token = user.generateToken();
           const user1 = {...data, token};
           return user1;
        } catch (error) {
            console.log("something wrong in repository");
            throw error;
        }
    }
}

module.exports = UserRepository