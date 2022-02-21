import { IsEmail, IsNotEmpty } from 'class-validator';
export class AuthDto{
    @IsEmail()
    email: string
  
    @IsNotEmpty()
    password: string
}

// utiliser pour toute l'authentification (login/register)