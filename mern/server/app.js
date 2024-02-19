const dotenv=require("dotenv");
const mongoose =require('mongoose');
const express=require('express');
const app=express();

dotenv.config({path:'./config.env'});

//const User=require('./model/userSchema');

app.use(express.json());

//linking router file
app.use(require('./router/auth'));



const PORT=process.env.PORT;



//middleware
const middleware= (req,res,next)=> {
    console.log("Hello my Middleware");
    next();
}





app.get('/',(req,res) => {
    res.send('Hello world');
});

app.get('/about',(req,res) => {
    res.send('Hello world about');
});

app.get('/contact',(req,res) => {
    // res.cookie("Test",'amrita');
    res.send('Hello world contact');
});

app.get('/signup',(req,res) => {
    res.send('Hello world reg');
});

app.get('/login',(req,res) => {
    res.send('Hello world login');
});

app.get('/profile',middleware,(req,res) => {
    console.log("Hello my profile");
    res.send('Hello world profile');
});






app.listen(PORT, ()=>
{
    console.log(`server is running at port no ${PORT}`);
})