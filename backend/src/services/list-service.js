const ListRepository = require('../respository/list-repository')

class ListService {
    constructor() {
        this.listrepo = new ListRepository();
    }
    async create(data) {
        try {
            const list = await this.listrepo.create(data);
            return list;
        } catch (error) {
            console.log("something wrong at service level");
            throw error;
        }
    }

    async update(listId, data) {
        try {
            const list = await this.listrepo.update(listId, data);
            return list;
        } catch (error) {
            console.log("something wrong at service level");
            throw error;
        }
    }

    async getById(listId){
        try {
            const items = await this.listrepo.getTasks(listId);
            return items;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(listid){
        try {
           const deleteitems = await this.listrepo.delete(listid);
           return deleteitems; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = ListService;