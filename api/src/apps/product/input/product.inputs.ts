import { Field, InputType, Int } from "type-graphql";

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
