import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class SaveUserDto {
  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  site?: string;
}