const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const UserRouter = require('./routes/user');
const DashboardRouter = require('./routes/dashboard');
const {restrict} = require('./middleware/auth');
const cors = require("cors");
const cookieParser= require('cookie-parser');


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/trial2").then(()=>console.log("mongodb connected"));
// app.use(bodyParser.json());
app.use(cors({origin: true, credentials:true}));
app.use(express.json()); // for application/json 
app.use(cookieParser());
app.use('/user', UserRouter);
// app.use(restrict);
app.use('/dashboard' , DashboardRouter)


const port = 8000;
app.listen(port, ()=>console.log(`server running on port ${port}`));
