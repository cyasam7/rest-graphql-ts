import { Resolver, Query, Mutation, Arg, Field, InputType, Int } from "type-graphql";
import Container, { Inject, Service } from "typedi";
import { InjectManager } from "typeorm-typedi-extensions";

import { Product } from "../entity/product.entity";
import { ProductCreateInput, ProductUpdateInput } from "../input/product.inputs";
import { ProductService } from "../services/product.services";

@Service()
@Resolver()
export class ProductResolver {
    constructor(@Inject() private readonly ServicesProduct: ProductService) {}

    /*     ServicesProduct = Container.get(ProductService); */

    @Query(() => [Product])
    async products() {
        return await this.ServicesProduct.getProducts();
    }

    @Mutation(() => Product)
    async getProductById(@Arg("id", () => Int) id: number) {
        return await this.ServicesProduct.getProductById(id);
    }

    @Mutation(() => Product)
    async createProduct(@Arg("variable", () => ProductCreateInput) variable: ProductCreateInput) {
        return this.ServicesProduct.createProduct(variable);
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg("id", () => Int) id: number) {
        try {
            this.ServicesProduct.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }

    @Mutation(() => Boolean)
    async updateProduct(
        @Arg("body", () => ProductUpdateInput) body: ProductUpdateInput,
        @Arg("id", () => Int) id: number
    ) {
        try {
            this.ServicesProduct.update(id, body);
            return true;
        } catch (error) {
            return false;
        }
    }
}
