import * as dotenv from "dotenv";

dotenv.config();

interface config {
    port: string;
    host: string;
    secret: string;
    type_db: string;
    host_db: string;
    port_db: number;
    username_db: string;
    password_db: string;
    database: string;
}

export const config: config = {
    port: String(process.env.PORT),
    host: String(process.env.HOST),
    secret: String(process.env.SECRET),
    type_db: String(process.env.TYPE_DB),
    host_db: String(process.env.HOST_DB),
    port_db: parseInt(String(process.env.PORT_DB)),
    username_db: String(process.env.USERNAME_DB),
    password_db: String(process.env.PASSWORD_DB),
    database: String(process.env.DATABASE),
};
