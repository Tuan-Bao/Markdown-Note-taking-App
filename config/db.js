import mysql from "mysql2";
import { configDotenv } from "dotenv";
configDotenv();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool.promise();
