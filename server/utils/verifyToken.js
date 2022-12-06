import jwt from "jsonwebtoken";
import { createError } from "./error";

// Pengecekan Token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token || token === undefined)
    return next(createError(401, "You are not authenthicated !"));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }
    req.user = user;
    next();
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.is_admin && req.user.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
