import { Resolver, Query, Mutation, Arg, Field, InputType, Int } from "type-graphql";
import { Inject, Service } from "typedi";

import { Product } from "../entity/product.entity";
import { ProductService } from "../services/product.services";

@InputType()
export class ProductCreateInput {
    @Field(() => String)
    name!: string;

    @Field(() => Int)
    quantity!: number;

    @Field(() => Int)
    user!: number;
}

@InputType()
export class ProductUpdateInput {
    @Field()
    name?: string;

    @Field()
    quantity?: number;

    @Field(() => Int)
    user?: number;
}

@Service()
@Resolver((of) => Product)
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
