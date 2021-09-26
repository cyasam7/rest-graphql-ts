import { UserResolvers, Users } from "./auth";
import { ProductResolver, Product } from "./product";

export const resolvers = [UserResolvers, ProductResolver];

export const entities = [Users, Product];
