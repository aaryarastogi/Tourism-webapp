import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const LoginSchema=new mongoose.Schema({
    username:{
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
    phoneNumber:{
        type:Number,
        required:false
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

LoginSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},"mynameisaaryarastogiiamamernstackdeveloper")
        console.log("token",token);
        this.tokens=this.tokens.concat({token:token})
        await this.save();
        return token;
    }
    catch(e){
        console.log("generate auth token failed",e);
    }
}


const collection=mongoose.model("collections",LoginSchema)

export default collection;