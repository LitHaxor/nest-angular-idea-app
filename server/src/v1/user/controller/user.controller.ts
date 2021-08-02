import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { User } from 'src/utils/decorator/user.decorator';
import { AuthGuard } from 'src/utils/gurds/auth.guard';
import { ValidationPipe } from 'src/utils/validations/validation.pipe';
import { LoginUserDto } from '../dto/loginUserDtos';
import { RegisterUserDto } from '../dto/RegisterUser.dto';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    @UseGuards(AuthGuard)
    findAllUsers(@User('username') user) {
        console.log(user);
        
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
