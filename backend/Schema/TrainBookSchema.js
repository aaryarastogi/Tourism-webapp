import mongoose from "mongoose";

const trainBookSchema=new mongoose.Schema({
    category:{
        type:String,
        required:false
    },
    fromCity:{       
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    travelDate:{
        type:String,
        required:true
    },
    trainNumber:{
        type:String,
        required:true
    },
    seatingClass:{
        type:String,
        required:false
    },
})

const trainBookCollection=mongoose.model("trainBookCollection",trainBookSchema);

export default trainBookCollection;