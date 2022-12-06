const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doctors', {
    doctor_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'doctors',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "doctors_pkey",
        unique: true,
        fields: [
          { name: "doctor_id" },
        ]
      },
    ]
  });
};
