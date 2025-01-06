import { UserDto } from "src/user/application/dto/response/user.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository{
    create(user: User): Promise<any>;
    findByEmail(email: string): Promise<UserDto | null>;
    findAll(): Promise<UserDto[]>;
}