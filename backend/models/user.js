const mongoose = require("mongoose");
// app.use(express.body)
const userSchema  = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
},
    {timestamps:true}

);

const User = mongoose.model("user", userSchema);

module.exports = User;