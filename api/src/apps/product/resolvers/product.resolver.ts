import { Resolver, Query, Mutation, Arg, Int, Authorized } from "type-graphql";
import { Inject, Service } from "typedi";

import { Product } from "../entity/product.entity";
import { ProductCreateInput, ProductUpdateInput } from "../input/product.inputs";
import { ProductService } from "../services/product.services";

@Service()
@Resolver()
export class ProductResolver {
    constructor(@Inject() private readonly ServicesProduct: ProductService) {}

    @Query(() => [Product])
    async products() {
        return await this.ServicesProduct.getProducts();
    }

    @Mutation(() => Product)
    async getProductById(@Arg("id", () => Int) id: number) {
        return await this.ServicesProduct.getProductById(id);
    }

    @Authorized("DEV")
    @Mutation(() => Product)
    async createProduct(@Arg("variable", () => ProductCreateInput) variable: ProductCreateInput) {
        return this.ServicesProduct.createProduct(variable);
    }

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id", () => Int) id: number) {
        await this.ServicesProduct.delete(id);
        return true;
    }

    @Authorized("ADMIN")
    @Mutation(() => Boolean)
    async updateProduct(
        @Arg("body", () => ProductUpdateInput) body: ProductUpdateInput,
        @Arg("id", () => Int) id: number
    ) {
        await this.ServicesProduct.update(id, body);
        return true;
    }
}
