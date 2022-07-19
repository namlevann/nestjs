import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { ROLE } from '../enum';
import { User, UserDocument } from '../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { HASH_LENGTH } from 'src/common';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, userName, password } = createUserDto;
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

  async findUser(userName: string): Promise<User> {
    const currentUser = this.userModel
      .findOne({ userName })
    return currentUser;
  }
}
