import dotenv from 'dotenv';
import {Pool } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
POSTGRES_PORT,
POSTGRES_DB,
POSTGRES_DB_TEST,
POSTGRES_USER,
POSTGRES_PASSWORD,
NODE_ENV,
} = process.env;

const pool = new Pool({
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string, 10),
    database: NODE_ENV === 'dev'? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})
pool.on('error', (error:Error) => {
    console.error(`Error: ${error.message}`)
})

export default pool

// export default {
//     host: POSTGRES_HOST,
//     port: parseInt(POSTGRES_PORT as string, 10),
//     database: NODE_ENV === 'dev'? POSTGRES_DB : POSTGRES_DB_TEST,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
// };