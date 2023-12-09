import mongoose from "mongoose";

const flightBookSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    fromCity:{       
        type:String,
        required:true
    },
    fromCity1:{
        type:String,
        required:false
    },
    destination:{
        type:String,
        required:true
    },
    destination1:{
        type:String,
        required:false
    },
    flight:{
        type:String,
        required:true
    },
    departureDate:{
        type:String,
        required:true
    },
    returnDate:{
        type:String,
        required:true
    }
})

const flightBookCollection=mongoose.model("flightBookCollection",flightBookSchema);

export default flightBookCollection;