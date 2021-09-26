import { UnauthorizedError } from "type-graphql";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { hashPassword, isValidPassword } from "../../../utils";
import { Users } from "../entity/user.entity";
import { CreateUserInput, LoginInput, TokenInput } from "../inputs/user.input";
import jwt from "jsonwebtoken";
import { config } from "../../../config/enviroment";

@Service()
export class UserServices {
    constructor(@InjectRepository(Users) private readonly UsersModel: Repository<Users>) {}

    async signIn(data: CreateUserInput): Promise<Users> {
        data.password = hashPassword(data.password);
        const newUser = Users.create(data);
        return await newUser.save();
    }

    async login(data: LoginInput): Promise<TokenInput> {
        const myUser = await this.UsersModel.findOne({ where: { email: data.email } });

        if (!myUser) {
            throw new UnauthorizedError();
        }
        if (isValidPassword(data.password, myUser.password)) {
            throw new UnauthorizedError();
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
    }

    async getAll(): Promise<Users[]> {
        return await this.UsersModel.find();
    }
}
