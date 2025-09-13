const { Sequelize } = require('sequelize');
require('dotenv').config(); 
console.log('DB_USER:', process.env.DB_USER);  
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); 
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD || null,  
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
);

sequelize.authenticate()
  .then(() => console.log('Connecté à la base de données MySQL'))
  .catch(err => console.error('Impossible de se connecter :', err));

module.exports = sequelize;
