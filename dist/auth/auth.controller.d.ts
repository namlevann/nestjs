import { UserService } from './../user/services/user.service';
import { CreateUserDto } from './../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/loginDTO';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(user: LoginDTO): Promise<{
        access_token: string;
    }>;
    register(user: CreateUserDto): Promise<import("../user/schema/user.schema").User>;
}
