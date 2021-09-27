import { UnauthorizedError } from "type-graphql";
import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { hashPassword, isValidPassword } from "../../../utils";
import { Users } from "../entity/user.entity";
import { CreateUserInput, LoginInput, TokenInput } from "../inputs/user.input";
import jwt from "jsonwebtoken";
import { config } from "../../../config/enviroment";
import { JWTServices } from "./jwt.service";

export interface IPayload {
    sub: string | number;
    rol: string;
    jwtid: string;
}

@Service()
export class UserServices {
    constructor(
        @InjectRepository(Users) private readonly UsersModel: Repository<Users>,
        @Inject() private readonly JWTServices: JWTServices
    ) {}

    async signIn(data: CreateUserInput): Promise<Users> {
        data.password = hashPassword(data.password);
        let myUser = Users.create(data);

        const payload: IPayload = {
            rol: myUser.rol,
            sub: myUser.id,
            jwtid: myUser.jwtid,
        };

        const { accessToken, refreshToken, jwtid } = this.JWTServices.sign(payload);

        myUser.accessToken = accessToken;
        myUser.refreshToken = refreshToken;
        myUser.jwtid = jwtid;

        return await myUser.save();
    }

    async login(data: LoginInput): Promise<TokenInput> {
        const myUser = await this.UsersModel.findOne({ where: { email: data.email } });

        if (!myUser) {
            throw new UnauthorizedError();
        }
        if (isValidPassword(data.password, myUser.password)) {
            throw new UnauthorizedError();
        }
        /* Create payload */
        const payload: IPayload = {
            sub: myUser.id,
            rol: myUser.rol,
            jwtid: myUser.jwtid,
        };

        const isValidAccessToken = this.JWTServices.verify(myUser.accessToken);
        const isValidRefreshToken = this.JWTServices.verify(myUser.refreshToken);

        let response = {
            token: myUser.accessToken,
        };

        if (!isValidAccessToken) {
            response.token = this.JWTServices.signAccessToken(payload);
        }

        if (!isValidRefreshToken) {
            myUser.refreshToken = this.JWTServices.signRefreshToken(payload);
        }

        myUser.jwtid = this.JWTServices.generateId();
        await myUser.save();

        return response;
    }

    async getAll(): Promise<Users[]> {
        return await this.UsersModel.find();
    }
}
