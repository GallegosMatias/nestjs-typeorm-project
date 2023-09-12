import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    
    async createUser(user: createUserDto) {

        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username
            }
        })

        if (userFound) {
            return new HttpException('User already exist! Try another one', HttpStatus.CONFLICT)
        }

        const newUser = this.userRepository.create(user)
        return this.userRepository.save(newUser)
    }

    getUsers() {
        return this.userRepository.find()
    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (!userFound) {
            return new HttpException('User not found!', HttpStatus.NOT_FOUND)
        }

        return userFound;
    }

    deleteUser(id: number) {
        return this.userRepository.delete({ id });
    }

    updateUser(id: number, user: updateUserDto) {
        return this.userRepository.update({id}, user)
    }
}
