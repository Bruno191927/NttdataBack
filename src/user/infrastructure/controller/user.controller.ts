import { Body, Controller, Get, Post } from "@nestjs/common";
import { Auth } from "../../application/common/decorators/auth.decorator";
import { LoginDto } from "../../application/dto/request/login.dto";
import { RegisterDto } from "../../application/dto/request/register.dto";
import { UserService } from "../../application/service/user.service";

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}
    @Post('register')
    async register(@Body() register: RegisterDto){
        return this.userService.register(register);
    }

    @Auth()
    @Get('users')
    findAllUser(){
        return this.userService.findAllUser();
    }

    @Post('login')
    login(@Body() login: LoginDto){
        return this.userService.login(login);
    }
}