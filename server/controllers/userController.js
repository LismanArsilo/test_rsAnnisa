import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error";

// Registrasi
const registrasi = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const createUser = await req.context.models.users.create({
      username: req.body.username,
      password: hash,
      is_admin: req.body.is_admin,
    });
    return res.status(200).json({ message: "Registrasi Success" });
  } catch (error) {
    next(error);
  }
};

// Login
const login = async (req, res, next) => {
  try {
    const user = await req.context.models.users.findOne({
      where: { username: req.body.username },
    });
    if (!user) return next(createError(404, "Username Or Password Invalid"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      return next(createError(404, "Username Or Password Invalid"));
    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT
    );
    const { password, is_admin, ...otherDetails } = user.dataValues;
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ data: { ...otherDetails }, message: "Login Success" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token", { httpOnly: false })
      .status(200)
      .json({ message: "Logout Success" });
  } catch (error) {
    next(error);
  }
};

export default {
  registrasi,
  login,
  logout,
};
