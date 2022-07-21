import { BadRequestException, Controller, Get, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/services/cloudinary.service';
import { User } from '../models/user.schema';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private cloudinary: CloudinaryService) {}

  @Get()
  async findAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:userName')
  async findUserByUsername(@Param('userName') userName: string): Promise<User> {
    return this.userService.findUser(userName);
  }

  @Patch('avatar/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param() { id }) {
    const { url } = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    return this.userService.updateAvatar(url, id);
  }
}
