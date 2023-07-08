import User from "../models/user.schema.js";
import CustomError from "../utils/customError.js";
import mailHelper from "../utils/mailHelper.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

//Signup Method
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new CustomError("name , email and passowrd is empty");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError("User already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = user.getJWTtoken();
    //safety
    user.password = undefined;

    //store this token in user's cookie
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      sucess: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Signin  Method
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("email and password does not exist", 400);
    }

    const user = User.findOne({ email }).select("+password");

    if (!user) {
      throw new CustomError("Invalid credentials", 400);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (isPasswordMatched) {
      const token = user.getJWTtoken();
      user.password = undefined;
      res.cookie("token", token, cookieOptions);
      return res.status(200).json({
        success: true,
        token,
        user,
      });
    }
    throw new CustomError("Password is incorect", 400);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//logout Method
export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Get Profile
export const getProfile = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new CustomError("User is not found", 400);
    }

    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Forget Password

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError("User is not found", 404);
    }

    const resetToken = user.generateForgetPasswordToken();

    await User.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
    console.log(myUrl);

    const message = `Your password reset token is as follows \n\n ${resetUrl} \n\n if this was not requested by you, please ignore.`;

    try {
      await mailHelper({
        email: user.email,
        subject: "Password reset mail",
        message,
      });
    } catch (error) {
      user.forgetPasswordToken = undefined;
      user.forgetPasswordExpiryTime = undefined;
      throw new CustomError("message could not sent", 500);
    }
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

//Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token: resetToken } = req.params;
    const { password, confirmPasword } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      forgotPasswordToken: resetPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      throw new CustomError("password reset token is invalid", 400);
    }

    if (password !== confirmPasword) {
      throw new CustomError("Password is not matching", 400);
    }

    user.password = password;
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiryTime = undefined;

    await user.save();

    const token = user.getJWTtoken();

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};
