import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ROLE } from '../enum';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { HASH_LENGTH } from 'src/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, userName, password } = createUserDto;
    const isExist = await this.userModel.findOne({ userName });
    if (isExist?.userName) {
      throw new NotFoundException(`User ${userName} is exist`);
    }
    const hashPassword = await bcrypt.hash(password, HASH_LENGTH);
    const createdUser = new this.userModel({
      email,
      userName,
      password: hashPassword,
      role: ROLE.USER,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async updateAvatar(url: string, id: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {
      avatar: url,
    });
    if (!user) {
      throw new NotFoundException();
    }
    return 'Upload avatar success';
  }

  async findUser(userName: string): Promise<User> {
    const currentUser = await this.userModel.findOne({ userName });
    if (!currentUser) {
      throw new NotFoundException(`User ${userName} not found`);
    }
    return currentUser;
  }

  async updateUser(user: UpdateUserDto, id: string) {
    const updateUser = await this.userModel.findByIdAndUpdate(id, user);
    if (!updateUser) {
      throw new NotFoundException();
    }
    return 'Update success';
  }
}
