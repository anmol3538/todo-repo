const UserService = require('../services/user-service')

const userservice = new UserService();

const register = async(req, res) => {
    try {
        const data = await userservice.create(req.body);
        return res.status(200).json({
            data: data,
            message: "Succesfully created the user",
            error: []
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
}


const login = async (req, res) => {
    try {
        const data = await userservice.find(req.body);
        console.log(data);
        return res.status(200).json({
            data: data,
            message: "login successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            data: {},
            success: false
        })
    }
}

module.exports = {
    register,
    login
}