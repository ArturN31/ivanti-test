//IMPORT MONGOOSE
import mongoose from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { NEXT_PUBLIC_MONGODB_URI } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        .connect(NEXT_PUBLIC_MONGODB_URI as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    //temperature schema
    const TemperatureSchema = new mongoose.Schema({
        temperature: Number
    })

    //temperature model
    const Temperature = mongoose.models.Temperature || mongoose.model("Temperature", TemperatureSchema)

    return { conn, Temperature }
}