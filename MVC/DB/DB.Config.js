const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user:  'root',
  password:  '12345678',
  database:  'machine'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
