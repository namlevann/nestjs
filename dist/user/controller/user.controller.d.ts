/// <reference types="multer" />
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '../schema/user.schema';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    private cloudinary;
    constructor(userService: UserService, cloudinary: CloudinaryService);
    findAllUser(): Promise<User[]>;
    findUserByUsername(userName: string): Promise<User>;
    uploadFile(file: Express.Multer.File, { id }: {
        id: any;
    }): Promise<User>;
}
