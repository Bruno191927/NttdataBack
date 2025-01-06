import { Module } from '@nestjs/common';
import { UserController } from '../controller/user.controller';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../../application/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../domain/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '../../../config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../application/common/strategies/jwt.strategy';

@Module({
    controllers: [UserController],
    providers: [UserRepository, UserService, JwtStrategy],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        JwtModule.register({
            secret: envs.jwtSecret,
            signOptions: {
                expiresIn: '1d'
            }
        })
    ]
})
export class UserModule {}
