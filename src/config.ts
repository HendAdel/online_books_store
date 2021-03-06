import dotenv from 'dotenv';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    NODE_ENV,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    JSON_SECRET_TOKEN,
} = process.env;

export default {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string, 10),
    database: NODE_ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    token:JSON_SECRET_TOKEN,
};