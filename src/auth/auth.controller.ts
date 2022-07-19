import { UserService } from './../user/services/user.service';
import { CreateUserDto } from './../user/dto/user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/loginDTO';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}
  @Post('login')
  async login(@Body() user: LoginDTO) {
    return this.authService.loginWithCredentials(user);
  }
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }
}
