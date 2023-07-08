import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import CustomError from "../utils/customError.js";

export const isLoggedIn = async (req, res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new CustomError("No authroize access to the resource", 401);
  }

  try {
    const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);

    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    console.log(error);
  }
};

// export const authorize = async (...requiredRoles) => {
//   return (req, res, next) => {
//     if (!requiredRoles.includes(req.user.role)) {
//       throw new CustomError("You are not authorized to access this resource");
//     }
//     next();
//   };
// };


export const authorize = (...requiredRoles) => async (req, res, next) => {
  if (!requiredRoles.includes(req.user.role)) {
      throw new CustomError("You are not authorized to access this resource")
  }
  next()
}