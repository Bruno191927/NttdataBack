import { IsEmail, IsString, Matches } from "class-validator";

export class LoginDto {
    @IsString()
    @IsEmail({}, { message: 'El correo electrónico no es válido' })
    email: string;
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número',
    })
    password: string;
}