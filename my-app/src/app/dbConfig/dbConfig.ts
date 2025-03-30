import { error } from "console";
import mongoose from "mongoose";

export  async function connect() {

    try {
        
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log("MongoDB Connected SuccessFully");
        })

        connection.on('error',(err)=>{
            console.log("Some Problem in Connection of MONGODB")
            console.log(err)
        })

    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
        
    }
}