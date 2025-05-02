const mongoose = require("mongoose");
const connection = async () => {
    await mongoose.connect("mongodb://localhost/todo")
}
module.exports = connection