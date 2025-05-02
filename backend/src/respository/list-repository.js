const List = require('../models/list')
const User = require('../models/user')
class ListRepository {
    constructor() {}

    async create(data){
        try {
            const list = await List.create(data);
            await User.findByIdAndUpdate(
                list.user,
                { $push: { list: list._id } },
                { new: true }
              );
            return list;
        } catch (error) {
            console.log("something wrong at repo level");
            throw error;
        }
    }


    async update(listId, data) {
        try {
            console.log(listId, data);
          const updatedList = await List.findByIdAndUpdate(listId, data, {
            new: true
          });
          console.log(updatedList);
          return updatedList;
        } catch (error) {
          console.log("Error while updating list in repository");
          throw error;
        }
    }

    async get(data){
        try {
            const items = await List.findById(data);
            return items;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getTasks(id){
        try {
            const items = await List.find({
                user : id
            });
            return items;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(deleteid){
        try {
            const list = await List.findByIdAndDelete(deleteid);
            if (list) {
            await User.findByIdAndUpdate(list.user, {
                $pull: { list: list._id }
            });
            }
            return list;
        } catch (error) {
            console.log("Something wrong at repo level");
            throw error;
        }
    }
}

module.exports = ListRepository