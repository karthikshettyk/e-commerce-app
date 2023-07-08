import mongoose from "mongoose";
import { Schema } from "mongoose";
import productCollection from "../utils/productCollections.js";

const Collection = Schema({
  collectionName: {
    type: String,
    required: true,
    enum: Object.values(productCollection)
  },
},{
  timestamps:true
});

export default mongoose.model("Collection", Collection);
