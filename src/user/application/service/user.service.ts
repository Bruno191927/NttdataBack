import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/repository/user.interface";
import { UserRepository } from "../..//infrastructure/repository/user.repository";
import { RegisterDto } from "../dto/request/register.dto";
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { IJwt } from "../..//domain/interfaces/jwt.interface";
import { LoginDto } from "../dto/request/login.dto";
@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository) private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService
    ) { }

    async register(register: RegisterDto) {
        const { email, password, name, cellphone } = register;
        const existerUser = await this.userRepository.findByEmail(email);
        if (existerUser) {
            throw new BadRequestException('Este correo ya esta en uso')
        }
        const hash = await this.hashPassword(password);
        const newUser = await this.userRepository.create({
            email,
            name,
            password: hash,
            cellphone
        });
        const jwtPayload: IJwt = {
            id: newUser._id.toString()
        }
        return {
            message: 'Se registro el usuario de manera correcta',
            token: this.getJwtToken(jwtPayload)
        }
    }

    async login(login: LoginDto) {
        const { email, password } = login;
        const existUser = await this.userRepository.findByEmail(email);
        if (!existUser) {
            throw new BadRequestException('No hay correo registrado')
        }
        const validatePassword = await this.comparePasswords(password,existUser.password!);
        if(!validatePassword){
            throw new BadRequestException('Usuario o contraseña incorrecta');
        }
        const jwtPayload: IJwt = {
            id: existUser.id
        }
        return {
            message: 'Inicio de sesion correcto',
            token: this.getJwtToken(jwtPayload)
        }
    }

    async findAllUser(){
        const users = await this.userRepository.findAll();
        return users;
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        const compare = await bcrypt.compare(password, hashedPassword);
        return compare;
    }

    private getJwtToken(payload: IJwt) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}