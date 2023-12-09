import mongoose from "mongoose";

const hotelBookSchema=new mongoose.Schema({
    category:{
        type:String,
        required:false
    },
    location:{       
        type:String,
        required:true
    },
    checkinDate:{
        type:String,
        required:true
    },
    checkoutDate:{
        type:String,
        required:true
    },
    rooms:{
        type:String,
        required:false
    },
    price:{
        type:String,
        required:true
    }
})

const hotelBookCollection=mongoose.model("hotelBookCollection",hotelBookSchema);

export default hotelBookCollection;