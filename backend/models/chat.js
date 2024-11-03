const mongoose = require("mongoose");
// app.use(express.body)


const messageSchema = new mongoose.Schema({
    senderName: { type: String},
    receiverName: { type: String},
    content: { type: String},
    timestamp: { type: Date, default: Date.now },
  });


const chatSchema  = new mongoose.Schema({
    id: {type: String},
    // names of users in sorted order.
    users: [{type: String}],
    messages: [messageSchema],
}, {
  timestamps: true
});

const Chat = mongoose.model("chats", chatSchema);

module.exports = Chat;