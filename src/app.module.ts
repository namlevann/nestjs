import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from './modules/auth.module';
import { CloudinaryModule } from './modules/cloudinary.module';
import mongoConfig from './config/mongoConfig';

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
