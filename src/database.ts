import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from './config'


const pool = new Pool({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
})
pool.on('error', (error: Error) => {
    console.error(`Error: ${error.message}`)
})

export default pool
