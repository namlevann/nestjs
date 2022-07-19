import { User } from '../schema/user.schema';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAllUser(): Promise<User[]>;
    findUserByUsername(userName: string): Promise<User>;
}
