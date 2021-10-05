import { Application } from "express";
import { createExpressServer } from "routing-controllers";
import { controllers } from "../apps/index";
import { config } from "../config/enviroment";

export async function startServerRest(): Promise<Application> {
    const app = createExpressServer({
        controllers: controllers,
        routePrefix: config.server.prefix_rest,
    });
    return app;
}
