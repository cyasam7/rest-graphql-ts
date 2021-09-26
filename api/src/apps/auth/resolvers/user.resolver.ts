import { Arg, Mutation, Resolver } from "type-graphql";
import { CreateUserInput, LoginInput, TokenInput } from "../inputs/user.input";
import { Users } from "..";
import { Inject, Service } from "typedi";
import { UserServices } from "../services/user.service";

@Service()
@Resolver()
export class UserResolvers {
    constructor(@Inject() private ServicesUser: UserServices) {}

    @Mutation(() => Users)
    async signIn(@Arg("user", () => CreateUserInput) user: CreateUserInput) {
        return await this.ServicesUser.signIn(user);
    }

    @Mutation(() => TokenInput)
    async logIn(@Arg("user", () => LoginInput) user: LoginInput) {
        return await this.ServicesUser.login(user);
    }
}
