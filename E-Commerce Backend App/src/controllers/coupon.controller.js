import Coupon from "../models/coupon.schema.js";
import CustomError from "../utils/customError.js";

//Create Coupon

export const createCoupon = async (req, res) => {
  const { code, discount } = req.body;
  try {
    if (!code || !discount) {
      throw new CustomError("code and discount is empty", 400);
    }

    const coupon = await Coupon.create({
      code,
      discount,
    });

    res.status(200).json({
      sucess: true,
      message: "coupon created sucessfully",
      coupon: coupon,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Read All Coupons

export const readAllCoupon = async (req, res) => {
  try {
    const allCoupons = await Coupon.find();
    if (!allCoupons) {
      throw new CustomError("No coupons available");
    }

    res.status(200).json({
      sucess: true,
      allCoupons,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Update Coupon

export const updateCoupon = async (req, res) => {
  try {
    const { id: couponId } = req.params;
    const { action } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      couponId,
      {
        active: action,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!coupon) {
      throw new CustomError("coupons not find", 400);
    }

    res.status(200).json({
      sucess: true,
      message: "coupon updated",
      coupon: coupon,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Delete Coupon

export const deleteCoupon = async (req, res) => {
  try {
    const { id: couponId } = req.params;
    const coupon = await Coupon.findByIdAndDelete(couponId);

    if (!coupon) {
      throw new CustomError("Coupon not found", 404);
    }

    res.status(200).json({
      sucess: true,
      message: "coupon deleted sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};
