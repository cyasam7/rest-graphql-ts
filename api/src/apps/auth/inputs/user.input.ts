import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name!: string;
    @Field(() => String)
    email!: string;
    @Field(() => String)
    password!: string;
    @Field(() => String)
    rol!: string;
}

@InputType()
export class LoginInput {
    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}

@ObjectType()
export class TokenInput {
    @Field(() => String)
    token!: string;
}
