const ListService = require('../services/list-service')
const listservice = new ListService();

const additems = async(req, res) => {
    try {
        console.log("User from token:", req.user);
        const user = req.user.id;
        const items1 = {user, ...req.body};
        const items = await listservice.create(items1);
        return res.status(200).json({
            message: "list added successfully",
            data: items,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: error.message,
            data: [],
            success: false
        })
    }
}


const updateList = async (req, res) => {
    try {
      const listId = req.params.id;
      const updated = await listservice.update(listId, req.body);
  
      return res.status(200).json({
        message: 'List updated successfully',
        data: updated,
        success: true
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error while updating list',
        success: false,
        data: {}
      });
    }
  };


  const getList = async (req, res) => {
    try {
      console.log('user:- ', req.user);
      const list = await listservice.getById(req.user.id);
      console.log('List:- ', list);
  
      if (!list) {
        return res.status(404).json({ message: 'List not found', success: false });
      }
  
      return res.status(200).json({ data: list, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting list', success: false });
    }
  };


  const deleteList = async (req, res) => {
    try {
      const list = await listservice.delete(req.params.id);
  
      if (!list) {
        return res.status(404).json({ message: 'List not found', success: false });
      }
  
      return res.status(200).json({ message: 'List deleted successfully', success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting list', success: false });
    }
  };

module.exports = {
    additems,
    updateList,
    getList,
    deleteList
}