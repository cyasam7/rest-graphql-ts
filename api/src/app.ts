import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchemaSync } from "type-graphql";
import { context, authChecker } from "./utils";
import { UserResolvers } from "./apps/auth";
import { ProductResolver } from "./apps/product";
import Container from "typedi";
import { useContainer } from "typeorm";

export async function startServer() {
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
    server.applyMiddleware({ app, path: "/graphql" });
    return app;
}
