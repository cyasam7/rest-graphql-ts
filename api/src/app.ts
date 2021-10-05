import { startServerGraphql } from "./servers/grapqhl";
import { startServerRest } from "./servers/rest";
import { connectTypeOrm } from "./config/typeorm";
import { config } from "./config/enviroment";
import { Application } from "express";

export async function startServer(): Promise<Application> {
    let app;
    const isApiRest = config.server.is_api_rest;
    await connectTypeOrm();
    isApiRest ? (app = startServerRest()) : (app = startServerGraphql());
    return app;
}
