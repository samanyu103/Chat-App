const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../service/auth');
const { reset } = require('nodemon');



router.post('/login', async(req,res)=>{
    console.log(req.body);
    const user = await User.findOne({email:req.body.email});
    console.log(user);
    if (!user) {
        console.log("user doesnt exist");
        res.status(401).send({msg:"user not found"});
        return;
    }
    if (req.body.password!= user.password) {
        console.log("incorrect password");
        res.status(401).send({msg:"incorrect password"});
        return;
    }
    console.log("user found");
    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie('uid', token,{
        sameSite: "none",
        httpOnly: true

    });
    // res.cookie('uid', sessionId, {
    //     httpOnly: true,
    //     sameSite: "none",
    // });
    res.status(200).send(user);
    return;

})

router.post('/signup', async(req,res) =>{
    console.log(req.body);
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    // user exists with email id
    if (user) {
        console.log("email exists");
        res.status(401).send("email exists");
    }else {
        const response = await User.create(req.body);
        console.log(response);
        res.status(200).send("user created");
    }


})

router.get('/getdata', async (req,res) =>{
    const allUsers = await User.find({});
    res.send(allUsers);
})


module.exports = router;