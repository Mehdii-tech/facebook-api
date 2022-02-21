import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/services/users.service";
import { AuthDto } from "../dtos/auth.dto";
import  { hash, compare } from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{
    constructor(private readonly usersService:UsersService, private readonly jwtService:JwtService){}

    async userExists(email:string){
        return await this.usersService.findUser( email )
    }

    async passwordMatching(newPassword:string, realPassword:string){
        return await compare(
            newPassword,
            realPassword
        );
    }
    async validateUser(email: string, password: string){
        const user = await this.userExists(email)
        const passwordMatch = await this.passwordMatching(password, user.password)
        if (user && passwordMatch) {
          const { password, ...result } = user;

          return result;
        }
        return null;
    }

    async login({email, password}:AuthDto){      
        const payload = { email };
// on veut renvoyer le user sans le mdp et encore moins si il n'est pas encrypté !!! + le token donc
        const user = await this.validateUser(email, password)
        return{
            user,
            token: this.jwtService.sign(payload)
        }
    }
    
    async register(authDto:AuthDto){
        const user = await this.userExists(authDto.email)
        if (user){
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        const hashPassword = await hash(authDto.password, 12)
        return this.usersService.createUser(authDto.email, hashPassword)
    }
}