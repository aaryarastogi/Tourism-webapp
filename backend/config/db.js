import mongoose from "mongoose";
export const connectDB=async(username,pwd)=>{
    const URL= `mongodb+srv://esehi:react@cluster0.lfyoq9r.mongodb.net/`;
    try {
        await mongoose.connect(URL,{});
        console.log('connected to mongodb')
    } catch (error) {
        console.log('error while connecting with database',error.message);
    }
}

export default connectDB;