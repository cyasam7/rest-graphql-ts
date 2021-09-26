import * as bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { Request } from "express";
import { AuthChecker } from "type-graphql";
import { config } from "../config/enviroment";

export const hashPassword = (password: string) => bcrypt.hashSync(password, 10);

export const isValidPassword = (password: string, hashedPassword: string): boolean =>
    bcrypt.compareSync(password, hashedPassword);

interface Context {
    res: Response;
    req: Request;
    token?: string;
}

export const context = ({ req, res }: Context) => {
    const headerAuthorization = req.headers.authorization;
    const token = headerAuthorization?.replace("Bearer ", "");
    return {
        token,
        req,
        res,
    };
};

export const authChecker: AuthChecker<Context> = ({ context: { token } }, roles) => {
    if (!token) return false;

    const user: any = jwt.verify(token, config.secret);

    if (!user) return false;

    if (!user.isConfirmed) return false;

    if (roles.includes(user.rol)) return true;

    return false;
};
