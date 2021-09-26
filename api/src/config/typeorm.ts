import { createConnection, useContainer } from "typeorm";
import { entities } from "../apps";
import { Container } from "typeorm-typedi-extensions";
import { config } from "./enviroment";

console.log(config);
export async function connect() {
    try {
        useContainer(Container);
        await createConnection({
            type: "mysql",
            host: config.host_db,
            port: 3306,
            username: config.username_db,
            password: config.password_db,
            database: config.database,
            entities,
            synchronize: true,
        });

        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
