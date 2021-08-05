import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginUserDto } from "../dto/loginUserDtos";
import { RegisterUserDto } from "../dto/RegisterUser.dto";
import { UserEntity } from "../entity/User.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAllUser() {
        const users = await this.userRepository.find();

        return users.map((user) => user.toReponseObject(false));
    }
    async findOne(id: string) {
        return await this.userRepository.findOne(id, {
            relations: ["ideas", "bookmarks"],
        });
    }

    async findByUsername(username: string) {
        return await this.userRepository.findOne({ where: { username } });
    }

    async login(loginUserDto: LoginUserDto) {
        const { username, password } = loginUserDto;
        const user = await this.findByUsername(username);
        if (!user)
            throw new HttpException(
                "username not found!",
                HttpStatus.UNAUTHORIZED,
            );
        if (!(await user.comparePassword(password)))
            throw new HttpException(
                "Incorrect password!",
                HttpStatus.UNAUTHORIZED,
            );
        return user.toReponseObject();
    }

    async register(registerUserDto: RegisterUserDto) {
        const existingUser = await this.findByUsername(
            registerUserDto.username,
        );
        if (existingUser)
            throw new HttpException("Existing user", HttpStatus.CONFLICT);
        const user = await this.userRepository.save(
            this.userRepository.create(registerUserDto),
        );
        return user.toReponseObject();
    }
}
