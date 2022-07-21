import { UserService } from 'src/services/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtTokenService: JwtService) {}
  async validateUserCredentials(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findUser(userName);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    console.log('user', user);
    const userToken = await this.validateUserCredentials(user.userName, user.password);
    return {
      access_token: this.jwtTokenService.sign(userToken._doc),
    };
  }
}
