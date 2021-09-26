import Container from "typedi";
import { createConnection, useContainer } from "typeorm";
import { entities } from "../apps";

export async function connect() {
    try {
        await createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "graphql",
            entities,
            synchronize: true,
        });
        useContainer(Container);

        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
