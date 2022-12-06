import { createError } from "../utils/error";

const findAll = async (req, res, next) => {
  try {
    const doctors = await req.context.models.doctors.findAll();
    if (doctors.length == 0)
      return res.status(404).json({ message: "Doctors Not Found" });
    return res
      .status(200)
      .json({ data: doctors, message: "Get All Doctors Success" });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const doctor = await req.context.models.doctors.findOne({
      where: { doctor_id: req.params.id },
    });
    if (!doctor) return res.status(404).json({ message: "Doctor Not Found" });
    return res
      .status(200)
      .json({ data: doctor, message: "Get Doctor Success" });
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findOne,
};
