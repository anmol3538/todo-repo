const UserRepository = require('../respository/user-repository')
class UserService {
    constructor(){
        this.userrepository = new UserRepository();
    }
    
    async create(data){
        try {
            const user = await this.userrepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at Service layer");
            throw error;
        }
    }

    async find(data){
        try {
            const user = await this.userrepository.find(data);
            return user;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }
}

module.exports = UserService