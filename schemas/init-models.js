var DataTypes = require("sequelize").DataTypes;
var _doctors = require("./doctors");
var _jadwal_doctor = require("./jadwal_doctor");
var _users = require("./users");

function initModels(sequelize) {
  var doctors = _doctors(sequelize, DataTypes);
  var jadwal_doctor = _jadwal_doctor(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  jadwal_doctor.belongsTo(doctors, { as: "doctor", foreignKey: "doctor_id"});
  doctors.hasMany(jadwal_doctor, { as: "jadwal_doctors", foreignKey: "doctor_id"});

  return {
    doctors,
    jadwal_doctor,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
