import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/services/prisma.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto";

@Injectable()
export class PostsService{
    constructor(private readonly prisma:PrismaService){}

    create({message}:CreatePostDto, authorId:string){
        return this.prisma.post.create({
            data:{
                message,
                Auhtor:{connect:{id:authorId}}
            }
        })
    }

    findOne(id:number){
        return this.prisma.post.findUnique({ where: { id: id }})
    }
    findAll(){
        return this.prisma.post.findMany()
    }

    update(id:number, updatePostDto:UpdatePostDto){
        return this.prisma.post.update({ 
            where:{
                id: id
            },
            data: updatePostDto
            })
    }

    delete(id:number){
        return this.prisma.post.delete({where:{id:id}})
    }
}