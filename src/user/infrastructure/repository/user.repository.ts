import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "../../application/dto/response/user.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/repository/user.interface";

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) { }

    async create(user: User): Promise<any> {
        try {
            return this.userModel.create(user);
        } catch (error) {
            throw new InternalServerErrorException(`Ocurrio un error al registrar el usuario ${error}`);
        }
    }

    async findByEmail(email: string): Promise<UserDto | null> {
        const user = await this.userModel.findOne({ email });
        if(user){
            return {
                name: user.name,
                email: user.email,
                password: user.password,
                id: user._id.toString(),
                cellphone: user.cellphone
            }
        }
        return null;
    }

    async findAll(): Promise<UserDto[]> {
        const listUser = await this.userModel.find().select('name email');
        const users: UserDto[] = listUser.map((user) => {
            const { email, name, _id} = user;
            return {
                email,
                name,
                id: _id.toString()
            }
        });
        return users;
    }

}