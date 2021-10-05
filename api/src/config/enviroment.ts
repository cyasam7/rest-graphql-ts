import * as dotenv from "dotenv";

dotenv.config();
interface config {
    server: {
        port: number;
        host: string;
        is_api_rest: boolean;
        graphql_route: string;
        prefix_rest: string;
    };
    auth: {
        secret: string;
    };
    db: {
        type_db: string;
        host_db: string;
        port_db: number;
        username_db: string;
        password_db: string;
        database: string;
    };
}

export const config: config = {
    server: {
        port: parseInt(<string>process.env.PORT),
        host: String(process.env.HOST),
        is_api_rest: Boolean(process.env.IS_API_REST),
        graphql_route: String(process.env.GRAPHQL_ROUTE),
        prefix_rest: String(process.env.PREFIX_REST),
    },
    auth: { secret: String(process.env.SECRET) },
    db: {
        type_db: String(process.env.TYPE_DB),
        host_db: String(process.env.HOST_DB),
        port_db: parseInt(String(process.env.PORT_DB)),
        username_db: String(process.env.USERNAME_DB),
        password_db: String(process.env.PASSWORD_DB),
        database: String(process.env.DATABASE),
    },
};
