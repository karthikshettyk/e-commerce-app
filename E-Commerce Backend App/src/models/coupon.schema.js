import mongoose from "mongoose";

import {Schema} from "mongoose";

const couponSchema = Schema({
code:{
    type:String,
    required:[true,"please provide the token"]
},

discount:{
    type:Number,
    default:0
},
actve:{
    type:Boolean,
    default:true
}
},{
    timestamps:true
})

export default mongoose.model("Coupon",couponSchema);