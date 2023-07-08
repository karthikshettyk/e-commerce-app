import Order from "../models/order.schema.js";
import CustomError from "../utils/customError.js";

//Generate the Razorpay Id
export const generateRazorPayId = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Get All User Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = Order.find({});
    if (!orders) {
      throw new CustomError("Orders could not found", 404);
    }

    res.status(200).json({
      sucess: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Get All Orders for admin

export const getAllOrders = async (req, res) => {
  try {

//TODO: we have to add all orders in the Admin orders schema


const allOrders = Order.find({});

if(!allOrders){
  throw new CustomError("NO all admin ordres found",404);
}

res.status(200).json({
  sucess:true,
  allOrders
})
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//To update the order status by the admin

export const updateOrderStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Add the order into the database
export const createOrder = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};
