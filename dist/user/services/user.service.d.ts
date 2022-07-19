import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { User, UserDocument } from '../schema/user.schema';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findUser(userName: string): Promise<User>;
}
