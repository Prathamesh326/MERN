const express=require('express');
const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

require('../db/conn');
const User=require("../model/userSchema");

router.get('/',(req,res) => {
    res.send('Hello world from the server router js');
});

router.post('/register',(req,res)=>{
    const{name,email,password,cpassword}=req.body;
    if(!name ||!email ||!password ||!cpassword){
        return res.status(422).json({error:"please fill the fields correctly"});
    }

    User.findOne({email:email})
    .then((userExist) => {
        if (userExist) {
            return res.status(422).json( {error: "Email already exist"});
        }else if(password != cpassword){
            return res.status(422).json( {error: "Passwords do not match!"});
        }
        else{
            const user= new User({name,email,password,cpassword});

       

            user.save().then(()=>{
                res.status(201).json({message:"user registered successfully"});
            }).catch((err)=>res.status(500).json({error:"Failed to registered"}) );
    
    
        }

        // const user= new User({name,email,password,cpassword});

       

        // user.save().then(()=>{
        //     res.status(201).json({message:"user registered successfully"});
        // }).catch((err)=>res.status(500).json({error:"Failed to registered"}) );




    }).catch(err => {console.log(err); });

}) ;

//login route
router.post('/login',async(req,res) =>{

try{
    let token;
   const{email,password}=req.body;

   if(!email||!password){
    return res.status(400).json({error:"Empty fields not allowed!"})
   }

   const userLogin= await User.findOne({email:email});
   //console.log(userLogin);
   if (userLogin){
    const isMatch=await bcrypt.compare(password,userLogin.password);

    token= await userLogin.generateAuthToken();
    console.log(token);

    res.cookie("jwtoken",token,{
        expires:new Date(Date.now() + 25892000000 ),
        httpOnly:true
    });



    if(!isMatch){
    
     res.status(400).json({error:"Invalid password!"});
 
    }else{
 
     res.json({message:"user signin successful"});
 
    }
   }else{
    res.status(400).json({error:"Invalid Credentials!"});
   }


  


}catch(err){
console.log(err);
}


});

module.exports=router;