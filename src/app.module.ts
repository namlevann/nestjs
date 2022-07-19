import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import mongoConfig from './mongoConfig';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRootAsync(mongoConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    UserModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
