import {
    Arg,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UnauthorizedError,
} from "type-graphql";
import jwt from "jsonwebtoken";

@InputType()
class CreateUserInput {
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
class LoginInput {
    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}

@ObjectType()
class TokenInput {
    @Field(() => String)
    token!: string;
}

@Resolver()
export class UserResolvers {
    /*   @Mutation(() => Users)
    async signIn(@Arg("user", () => CreateUserInput) user: CreateUserInput) {
        user.password = hashPassword(user.password);
        const newUser = Users.create(user);
        return await newUser.save();
    }

    @Mutation(() => TokenInput)
    async logIn(@Arg("user", () => LoginInput) user: LoginInput) {
        const myUser = await Users.findOne({ where: { email: user.email } });

        if (!myUser) {
            return new UnauthorizedError();
        }
        if (isValidPassword(user.password, myUser.password)) {
            return new UnauthorizedError();
        }
        const payload = {
            sub: myUser.id,
            rol: myUser.rol,
            email: myUser.email,
        };

        const token = jwt.sign(payload, config.secret, {
            expiresIn: "15m",
        });
        return { token };
    } */
}
