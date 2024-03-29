const jwt=require("jsonwebtoken");
const mongoose=require('mongoose');
const bcrypt= require('bcryptjs');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
    
})

 

//hashing pwd
userSchema.pre('save', async function(next) {
    console.log("hi from inside");
    if(this.isModified('password')){
        this.password=bcrypt.hashSync(this.password,12);
        this.cpassword=bcrypt.hashSync(this.password,12);
    }
    next(); 
});

//generating token
userSchema.methods.generateAuthToken=async function(){
    try{

    let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.tokens=this.tokens.concat({token:token});
    await this.save();
    return token;

    }catch(err){
        console.log(err);
    }
}

const User=mongoose.model('USER',userSchema);

module.exports=User;