import * as dotenv from "dotenv";

dotenv.config();

interface config {
    port: string;
    host: string;
    secret: string;
}

export const config: config = {
    port: String(process.env.PORT),
    host: String(process.env.HOST),
    secret: String(process.env.SECRET),
};
