import { Controller, Body, Get, Post } from "routing-controllers";
import { Users } from "..";

@Controller("/auth")
export class AuthController {
    @Post("/")
    async logIn(@Body() user: Users) {
        return user;
    }
}
