import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "please provide the product name"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "pleas provide the price of the product"],
    },
    description: {
      type: String,
      require: [true, "please provide the description of the product"],
    },

    photo: 
      {
        id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    sold: {
      type: Number,
      required: true,
      default: 0,
    },

    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
