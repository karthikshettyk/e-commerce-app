import mongoose from "mongoose";
import authRoles from "../utils/authRoles.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import crypto from "crypto";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(authRoles),
      default: authRoles.USER,
    },
    forgetPasswordToken: {
      type: String,
      default: null,
    },
    forgetPasswordExpiryTime: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = {
  //comparing the password
  comparePassword: async function (enertedPassword) {
    return await bcrypt.compare(enertedPassword, this.password);
  },

  //get Jwt Token

  getJWTToken: async function () {
    let token = JWT.sign(
      {
        id: this._id,
        role: this.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.expiresIn,
      }
    );

    return token;
  },

  //generate forget password token
  generateForgetPasswordToken: async function () {
    const forgetToken = crypto.randomBytes(20).toString("hex");

    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(forgetToken)
      .digest("hex");

    this.forgetPasswordExpiryTime = Date.now() + 20 * 60 * 1000;

    return forgetToken;
  },
};

export default mongoose.model("User", userSchema);
