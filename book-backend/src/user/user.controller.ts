import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginRequestDto, RegisterRequestDto } from "./dto/user.request.dto";
import { ApiDoc } from "@/common/api-doc.decorator";
import { UserResponseDto } from "./dto/user.response.dto";
import { JwtAuthGuard } from "@/utils/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";


@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    @Post('/register')
    @ApiDoc({
        summary: 'Register a new user',
        bodyType: RegisterRequestDto,
        successType: UserResponseDto,
        successStatus: 201
    })
    async register(@Body() dto: RegisterRequestDto) {
        return this.userService.registerUser(dto);
    }

    @Post('login')
    @ApiDoc({
        summary: 'Login a user',
        bodyType: LoginRequestDto,
    })
    async login(@Body() dto: LoginRequestDto) {
        return this.userService.loginUser(dto);
    }

    @Get('me')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiDoc({
        summary: 'Get current user profile',
        successType: UserResponseDto
    })
    async getMe(@Req() req: any) {
        return this.userService.getMe(req.user.id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiDoc({
        summary: 'Get all active users',
        isArray: true,
        successType: UserResponseDto
    })
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
}