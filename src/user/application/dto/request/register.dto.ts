import { IsEmail, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @MinLength(3,{message: 'El nombre necesita al menos 3 caracteres'})
    name: string;
    @IsString()
    @IsEmail({},{message: 'El correo electrónico no es válido'})
    email: string;
    @IsString()
    @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número',
    })
    password: string;
    @IsOptional()
    @Matches(/^\d{9}$/, { message: 'El número de celular debe tener 9 dígitos' })
    cellphone?: string;
}