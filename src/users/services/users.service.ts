import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/services/prisma.service";
import { UpdateProfileDto } from "../dtos/update-profile.dto";


@Injectable()
export class UsersService{
    constructor(private readonly prisma:PrismaService){}

    createUser(email:string,password:string){
        // je creer le profile en meme temps que l'utilisateur
        return this.prisma.user.create({
            data:{
                email:email,
                password:password,
                Profile:{create:{firstName:'', lastName:''}}
            }
        })
    }

    findUser(email:string){
        //Email est unique donc findfirst plus opti
        return this.prisma.user.findFirst({
            where:{
                email:email
            }
        })
    }

    findPosts(id:string){
        return this.prisma.post.findMany({
            where:{
                authorId:id
            },
        })
    }

    findProfile(id:string){
        return this.prisma.profile.findUnique({
            where:{
                userId:id
            }
        })
    }
    
    updateProfile(id:string, {firstName, lastName}:UpdateProfileDto){
        return this.prisma.profile.update({
            where:{
                userId:id
            },
            data:{ 
                firstName, 
                lastName 
            }
        })
    }
}