import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginRequesDto, RegisterRequestDto } from "./dto/user.request.dto";


@Controller('users')
export class UserController{

    constructor(
        private readonly userService : UserService
    ){}


    @Post('/register')
    async register(@Body() dto : RegisterRequestDto){
        return this.userService.registerUser(dto);
    }

    @Post('login')
    async login(@Body() dto : LoginRequesDto){
        return this.userService.loginUser(dto);
    }
}