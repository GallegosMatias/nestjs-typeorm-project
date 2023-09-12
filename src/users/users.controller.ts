import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        console.log(id);
        console.log(typeof(id));
        return this.usersService.getUser(id);
    }

    @Post()
    createUser(@Body() newUser: createUserDto): Promise<User> {
        return this.usersService.createUser(newUser)

    }


}