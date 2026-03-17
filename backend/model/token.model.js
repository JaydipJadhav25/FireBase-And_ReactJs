import mongoose from "mongoose";


const tokeSchema = mongoose.Schema({
    token : String,
});

export const TokenModel = mongoose.model("token" , tokeSchema);