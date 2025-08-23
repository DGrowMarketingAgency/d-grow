import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

// console.log("PG_PASSWORD from env:", process.env.PG_PASSWORD);


const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

export default pool;
