import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { patternEmail } from 'src/constants/common';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(patternEmail)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(16)
  password: string;
}
