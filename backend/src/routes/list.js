const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const {additems, updateList, getList, deleteList} = require('../controller/list-controller')

router.post('/additems', authenticate, additems);
router.put('/updatelist/:id', updateList)
router.get('/getlist', authenticate, getList);
router.delete('/deletelist/:id', authenticate, deleteList);

module.exports = router