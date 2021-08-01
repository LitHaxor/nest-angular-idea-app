import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/utils/validations/validation.pipe';
import { LoginUserDto } from '../dto/loginUserDtos';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    findAllUsers() {
        return this.userService.findAllUser();
    }

    @UsePipes(new ValidationPipe())
    @Post('auth/login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto);
    }

    @UsePipes(new ValidationPipe())
    @Post('auth/register')
    register(@Body() registerUserDto: RegisterUserDto) {
        return this.userService.register(registerUserDto);
    }
};
