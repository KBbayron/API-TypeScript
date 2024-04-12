import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("No existe el archivo .env")
}

export default {
    PORT: process.env.PORT,
    DATABASE_URI: `${process.env.DATABASE}://${process.env.MYSQL_USER}@${process.env.MYSQL_HOST}:${process.env.MYSQL_PORT}/${process.env.MYSQL_DATABASE}`
}