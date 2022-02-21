import { Body, Request, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Public } from "src/public.decorator";
import { AuthDto } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";



@Controller('authentication')
export class AuthController{
    constructor(private readonly authService:AuthService){}

    // localstrategy pour l'authentification, pas besoin de jwtstrategy 
    // car non necessité d'avoir une authorization pour effectuer cette route
    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() authDto:AuthDto){
        return await this.authService.login(authDto)
    }

    @Public()
    @Post('/register')
    async register(@Body() authDto:AuthDto){
        return await this.authService.register(authDto)
    }
}