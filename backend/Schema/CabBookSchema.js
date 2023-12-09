import mongoose from "mongoose";

const cabBookSchema=new mongoose.Schema({
    category:{
        type:String,
        required:false
    },
    fromCity:{       
        type:String,
        required:false
    },
    destination:{
        type:String,
        required:false
    },
    departureDate:{
        type:String,
        required:false
    },
    returnDate:{
        type:String,
        required:false
    },
    pickupTime:{
        type:String,
        required:false
    },
    dropTime:{
        type:String,
        required:false
    },
    pickuptype:{
        type:String,
        required:false
    },
    airport:{
        type:String,
        required:false
    },
    pickupDate:{
            type:String,
            required:false
    },
    pickupLoc:{
        type:String,
        required:false
    },
    packageValue:{
        type:String,
        required:false
    }
})

const cabBookCollection=mongoose.model("cabBookCollection",cabBookSchema);

export default cabBookCollection;