import Sequelize from "sequelize";
import config from "../../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const DataTypes = require("sequelize").DataTypes;
const _doctors = require("./doctors");
const _jadwal_doctor = require("./jadwal_doctor");
const _users = require("./users");

function initModels(sequelize) {
  const doctors = _doctors(sequelize, DataTypes);
  const jadwal_doctor = _jadwal_doctor(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  jadwal_doctor.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id" });
  doctors.hasMany(jadwal_doctor, {
    as: "jadwal_doctors",
    foreignKey: "doctor_id",
  });

  return {
    doctors,
    jadwal_doctor,
    users,
  };
}
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;

const models = initModels(sequelize);
export default models;
export { sequelize };
