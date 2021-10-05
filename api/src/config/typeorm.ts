import { createConnection, useContainer } from "typeorm";
import { entities } from "../apps";
import { Container } from "typeorm-typedi-extensions";
import { config } from "./enviroment";

export async function connectTypeOrm() {
    useContainer(Container);
    await createConnection({
        type: "mysql",
        host: config.db.host_db,
        port: 3306,
        username: config.db.username_db,
        password: config.db.password_db,
        database: config.db.database,
        entities,
        synchronize: true,
    });
    console.log(`Database ${config.db.database} is running from ${config.db.host_db}`);
}
