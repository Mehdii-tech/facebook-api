import { Body, Request, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PostsService } from "../services/posts.service";
import { CreatePostDto } from "../dtos/create-post.dto";
import { UpdatePostDto } from "../dtos/update-post.dto"


@Controller('posts')
export class PostsController{
    constructor(private readonly postsService:PostsService){}
    
    @Post()
    create(@Body() createPostDto:CreatePostDto, @Request() req: any){
        return this.postsService.create(createPostDto, req.user.id)
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.postsService.findOne(parseInt(id,10))
    }
    @Get()
    findAll() {
        return this.postsService.findAll()
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updatePostDto: UpdatePostDto){
        return this.postsService.update(parseInt(id,10), updatePostDto)
    }

    @Delete(":id")
    remove(@Param('id') id:string){
        return this.postsService.delete(parseInt(id,10))
    }
}