'use strict';
module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    default_printer: DataTypes.STRING,
    background_print: DataTypes.STRING,
    access_token: DataTypes.STRING,
    printLines: DataTypes.STRING,
    dr_education: DataTypes.STRING,
    dr_specialist: DataTypes.STRING,
    education_institute: DataTypes.STRING,
    reg_no: DataTypes.STRING,
    printTemplate: DataTypes.STRING,
    center_text: DataTypes.STRING,
    chamber_name: DataTypes.STRING,
    chamber_address: DataTypes.STRING,
    chamber_timing: DataTypes.STRING,
    margin_top: DataTypes.FLOAT,
    margin_bottom: DataTypes.FLOAT,
    margin_left: DataTypes.FLOAT,
    margin_right: DataTypes.FLOAT
  }, {});
  Settings.associate = function(models) {
    // associations can be defined here
  };
  return Settings;
};
