import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Model } from "mongoose";
import { User } from "../../../domain/entities/user.entity";
import { IJwt } from "../../../domain/interfaces/jwt.interface";
import { envs } from "../../../../config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {
        super({
            secretOrKey: envs.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: IJwt): Promise<User> {
        const { id } = payload;
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new UnauthorizedException('El token no es valido');
        }
        return user;
    }
}
