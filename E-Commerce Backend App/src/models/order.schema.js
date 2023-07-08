import mongoose from "mongoose";
import { Schema } from "mongoose";
import orderStatus from "../utils/orderStatus.js";

const orderSchema = Schema(
  {
    product: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          count: Number,
          price: Number,
        },
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: [true, "User has to enter the address"],
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    coupon: {
      type: String,
    },

    transactionId: {
      type: String,
    },

    status: {
      type: String,
      enum: Object.values(orderStatus),
      default: "ORDERED",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
