import { decode, sign, verify } from "jsonwebtoken";
import { TokenBase, TokenGenerator } from "ts-token-generator";
import { Service } from "typedi";
import { config } from "../../../config/enviroment";
import { IPayload } from "./user.service";

@Service()
export class JWTServices {
    private accessOptions: any = {
        algorithm: "HS256",
        keyid: "2",
        noTimestamp: false,
        expiresIn: "15m",
        notBefore: "0s",
    };
    private refreshOptions: any = {
        algorithm: "HS256",
        keyid: "2",
        noTimestamp: false,
        expiresIn: "1y",
        notBefore: "0s",
    };

    generateId(): string {
        return new TokenGenerator({
            bitSize: 512,
            baseEncoding: TokenBase.BASE62,
        }).generate();
    }

    sign(payload: IPayload): any {
        const accessToken = this.signAccessToken(payload);
        const refreshToken = this.signRefreshToken(payload);
        const jwtid = this.generateId();
        return { accessToken, refreshToken, jwtid };
    }

    signAccessToken(payload: IPayload): string {
        return sign(payload, config.secret, this.accessOptions);
    }

    signRefreshToken(payload: IPayload): string {
        return sign(payload, config.secret, this.refreshOptions);
    }

    decode(token: string): string | { [key: string]: string } | null | false {
        try {
            return decode(token);
        } catch {
            return false;
        }
    }

    verify(token: string): string | object | false {
        try {
            return verify(token, config.secret, this.refreshOptions);
        } catch {
            return false;
        }
    }
}
