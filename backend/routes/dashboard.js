const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Chat = require('../models/chat');

function generateChatId(senderId, receiverId) {
    return [senderId, receiverId].sort().join('-');
}

router.get('/', (req,res)=>{
    console.log('hello from dashboard');
    res.send({msg:"hello from dashboard"});
})
router.post('/send',async (req,res) =>{
    // console.log(req.body);
    // Find the sender and receiver in the User collection
    const {senderName, receiverName, content} = req.body;
    const sender = await User.findOne({ name: senderName});
    const receiver = await User.findOne({ name: receiverName });
    if (!sender) return console.log("Sender not found");
    if (!receiver) return console.log("Receiver not found");
    // generate chat id
    const chat_id = generateChatId(sender._id, receiver._id);
    var chat = await Chat.findOne({id: chat_id});
    // if chat doesnt exist create it
    if (!chat) {
        chat = await Chat.create({
            id: chat_id,
            users: [senderName, receiverName].sort(),
            messages: [],
        });
        // sender schema update with receiver and viceversa
    }
    chat.messages.push({senderName, receiverName, content});
    // schema update timestamp
    await chat.save();
    // console.log(chat);
    res.send({msg: "message sent"});
});

// get chat between sender and receiver
router.post('/get', async(req,res) => {
    const {senderName, receiverName} = req.body;
    const sender = await User.findOne({ name: senderName});
    const receiver = await User.findOne({ name: receiverName });
    if (!sender) return console.log("Sender not found");
    if (!receiver) return console.log("Receiver not found");
    const chat_id = generateChatId(sender._id, receiver._id);
    var chat = await Chat.findOne({id: chat_id});
    if (!chat) {
        return res.status(404).json({ message: "No chat found between these users." });
    }
    res.status(200).json({ messages: chat.messages });
})



router.get('/receivers/:id', async(req,res) => {
    // console.log(req.params);
    const senderName = req.params.id;
    // find chats having one user as senderName. sort based on descending order of updated At. selecr only users and updated at.
    const chats = await Chat.find({ users: senderName }).sort({ updatedAt: -1 }).select('users updatedAt');
    // console.log(chats)

  // Format the response to include only the other user(s)
    const formattedChats = chats.map(chat => {
        const otherUsers = chat.users.filter(user => user !== senderName);
        return {
        otherUsers,
        updatedAt: chat.updatedAt,
        };
    });
    // console.log(formattedChats);
    res.status(200).json({ receivers: formattedChats });
});


// senderName,  receiver email, content.
router.post('/send_new_message',async (req,res) =>{
    // console.log(req.body);
    // Find the sender and receiver in the User collection
    const {senderName, receiveremail, nmc} = req.body;
    const sender = await User.findOne({ name: senderName});
    const receiver = await User.findOne({ email: receiveremail });
    const receiverName = receiver.name;
    if (!sender) return console.log("Sender not found");
    if (!receiver) return console.log("Receiver not found");
    // generate chat id
    const chat_id = generateChatId(sender._id, receiver._id);
    var chat = await Chat.findOne({id: chat_id});
    // if chat doesnt exist create it
    if (!chat) {
        chat = await Chat.create({
            id: chat_id,
            users: [senderName, receiverName].sort(),
            messages: [],
        });
        // sender schema update with receiver and viceversa
    }
    chat.messages.push({senderName, receiverName, content:nmc});
    // schema update timestamp
    await chat.save();
    res.status(200).send({msg: "message sent"});
});











module.exports = router;