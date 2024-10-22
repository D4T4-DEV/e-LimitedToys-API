import mysql2, { Pool, PoolConnection } from 'mysql2/promise';
import 'dotenv/config'; // configuración de dotenv

const { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DATABASE, MYSQL_PORT} = process.env;

const pool: Pool = mysql2.createPool({
    host: MYSQL_HOST as string,
    user: MYSQL_USER as string,
    password: MYSQL_PWD as string,
    database: MYSQL_DATABASE as string,
    port: parseInt(MYSQL_PORT as string, 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


export function getConnectionMySQL(): Promise<PoolConnection> {
    return pool.getConnection();
}