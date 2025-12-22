import mongoose from "mongoose";
import { envConfig } from "../config/env";

export async function connectToDb() {
    return mongoose.connect(envConfig.DATABASE_URL!, {
        retryWrites: true, 
        retryReads: true,        
    }).then(()=> {
        console.log("database connect successfully!")
    }).catch(()=> {
        console.error("database url is missing closing server")
        process.exit(0)
    })
}