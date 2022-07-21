import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { ROLE } from '../constants/enum';
import { User, UserDocument } from '../models/user.schema';
import * as bcrypt from 'bcrypt';
import { HASH_LENGTH } from 'src/constants/common';

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

  async updateAvatar(url: string, id: string): Promise<User> {
    const user = this.userModel
      .findByIdAndUpdate(id, {
        avatar: url,
      })
      .setOptions({ overwrite: true, new: true });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findUser(userName: string): Promise<User> {
    const currentUser = this.userModel.findOne({ userName });
    if (!currentUser) {
      throw new NotFoundException(`User ${userName} not found`);
    }
    return currentUser;
  }
}
