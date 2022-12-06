import { sequelize } from "../models/init-models";
import { createError } from "../utils/error";

const findOne = async (req, res, next) => {
  try {
    const jadwal = await req.context.models.jadwal_doctor.findOne({
      where: { id: req.params.id },
    });
    if (!jadwal) return next(createError(404, "Schedule Not Found"));
    return res
      .status(200)
      .json({ data: jadwal, message: "Get Schedule Success" });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const jadwal = await sequelize.query(
      "select a.*, b.username from jadwal_doctor a join doctors b on a.doctor_id = b.doctor_id",
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res
      .status(200)
      .json({ data: jadwal, message: "Get Schedule Success" });
  } catch (error) {
    next(error);
  }
};

const findAllIdDoctor = async (req, res, next) => {
  try {
    const jadwal = await sequelize.query(
      "select a.*, b.username from jadwal_doctor a join doctors b on a.doctor_id = b.doctor_id where b.doctor_id= :id_doctor",
      {
        replacements: { id_doctor: req.params.id_doctor },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ data: jadwal, message: "Get Schedule Success" });
  } catch (error) {
    next(error);
  }
};

const postDoctors = async (req, res, next) => {
  try {
    const jadwalLoop = req.body;
    const { date_range, day } = jadwalLoop;

    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dateLooping = [];
    for (
      const d = new Date(date_range[0]);
      d <= new Date(date_range[1]);
      d.setDate(d.getDate() + 1)
    ) {
      if (weekday[d.getDay()] == day) {
        const data = {
          doctor_id: req.body.doctor_id,
          day: req.body.day,
          time_start: req.body.time_start,
          time_finish: req.body.time_finish,
          quota: req.body.quota,
          status: req.body.status,
          date: new Date(d),
        };
        dateLooping.push(data);
      }
    }
    if (dateLooping.length === 0)
      return next(createError(500, "Created Invalid"));
    const jadwal = await req.context.models.jadwal_doctor.bulkCreate(
      dateLooping
    );
    return res
      .status(200)
      .json({ data: jadwal, message: "Input Data Success" });
  } catch (error) {
    next(error);
  }
};

export default {
  findAll,
  findOne,
  postDoctors,
  findAllIdDoctor,
};
