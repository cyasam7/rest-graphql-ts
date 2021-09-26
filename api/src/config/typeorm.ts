import { createConnection, useContainer } from "typeorm";
import { entities } from "../apps";
import { Container } from "typeorm-typedi-extensions";
export async function connect() {
    try {
        useContainer(Container);
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

        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}
