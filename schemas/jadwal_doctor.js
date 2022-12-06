const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jadwal_doctor', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'doctors',
        key: 'doctor_id'
      }
    },
    day: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    time_start: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    time_finish: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    quota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'jadwal_doctor',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jadwal_doctor_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
