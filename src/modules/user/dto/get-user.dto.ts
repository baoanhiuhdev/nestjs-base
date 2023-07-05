import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    type: Number,
    default: 1
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    default: 10
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    type: String,
    default: ''
  })
  @IsOptional()
  @IsString()
  search?: string;
}