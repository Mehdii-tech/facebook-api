import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UpdateProfileDto } from "../dtos/update-profile.dto";
import { UsersService } from "../services/users.service";



@Controller('users')
export class UsersController{
    constructor(private readonly usersService:UsersService){}


    @Get(':id/posts')
    findPostsByUserId(@Param('id') id:string){
        return this.usersService.findPosts(id)
    }

    @Get(':id/profiles')
    findProfileByUserId(@Param('id') id:string){
        return this.usersService.findProfile(id)
    }

    @Patch(':id/profile')
    updateProfileByUserId(@Param('id') id:string, @Body() updateProfileDto:UpdateProfileDto){
        return this.usersService.updateProfile(id, updateProfileDto)
    }
}

