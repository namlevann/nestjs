import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../schema/user.schema';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:userName')
  async findUserByUsername(@Param('userName') userName: string): Promise<User> {
    return this.userService.findUser(userName);
  }
}
