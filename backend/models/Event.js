const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,    
    allowNull: false,          
  },
  eventDate: {
    type: DataTypes.DATEONLY,  
    allowNull: false,          
  },
  eventTime: {
    type: DataTypes.TIME,      
    allowNull: false,          
  },
});



module.exports = Event;
