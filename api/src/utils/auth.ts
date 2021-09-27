import { Users } from "../apps/auth/entity/user.entity";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Request } from "express";
import { AuthChecker } from "type-graphql";
import { config } from "../config/enviroment";
import { JWTServices } from "../apps/auth/services/jwt.service";

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const isValidPassword = (password: string, hashedPassword: string): boolean =>
    bcrypt.compareSync(password, hashedPassword);

interface IBody {
    token?: string;
    refreshToken?: string;
}
interface Context {
    res: Response;
    req: Request;
    body: IBody;
}

export const context = ({ req, res }: Context) => {
    const headerAuthorization = req.headers.authorization;
    const headerAuthorizationAccessToken = req.headers["refresh-token"];
    const token = headerAuthorization?.replace("Bearer ", "");

    return {
        body: {
            token,
            refreshToken: headerAuthorizationAccessToken,
        },
        req,
        res,
    };
};

export const authChecker: AuthChecker<Context> = async (
    {
        context: {
            body: { refreshToken, token },
        },
    },
    roles
) => {
    /* if (!roles.length) return token !== undefined; */

    if (!token || !refreshToken) return false;

    const servicesJWT = new JWTServices();
    const user: any = servicesJWT.verify(token);
    if (!user) {
        const dataAccessToken = servicesJWT.verify(refreshToken);
        if (!dataAccessToken) {
            return false;
        }
        return true;
    }

    if (roles.includes(user.rol)) return true;

    return false;
};
