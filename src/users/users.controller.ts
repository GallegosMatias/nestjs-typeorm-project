import { Controller, Post, Body, Get } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.GetUsers();
    }

    @Post()
    createUser(@Body() newUser: createUserDto): Promise<User> {
        return this.usersService.CreateUser(newUser)

    }
}
