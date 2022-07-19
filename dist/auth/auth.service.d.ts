import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtTokenService;
    constructor(usersService: UserService, jwtTokenService: JwtService);
    validateUserCredentials(userName: string, password: string): Promise<any>;
    loginWithCredentials(user: any): Promise<{
        access_token: string;
    }>;
}
