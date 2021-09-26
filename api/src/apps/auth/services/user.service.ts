import { Service, Inject } from "typedi";
import { Repository } from "typeorm";
import { Users } from "../entity/user.entity";

@Service()
export class UserServices {
    constructor(@Inject("UserModel") private readonly UsersModel: Repository<Users>) {}

    async getAll(): Promise<Users[]> {
        return await this.UsersModel.find();
    }
}
