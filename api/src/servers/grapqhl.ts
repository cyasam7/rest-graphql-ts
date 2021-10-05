import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchemaSync } from "type-graphql";
import { context, authChecker } from "../utils";
import { UserResolvers } from "../apps/auth";
import { ProductResolver } from "../apps/product";
import Container from "typedi";
import { config } from "../config/enviroment";

export async function startServerGraphql(): Promise<Application> {
    const app = express();

    const server = new ApolloServer({
        schema: buildSchemaSync({
            resolvers: [UserResolvers, ProductResolver],
            authChecker,
            container: Container,
        }),
        context,
    });
    await server.start();
    server.applyMiddleware({ app, path: config.server.graphql_route });
    return app;
}
