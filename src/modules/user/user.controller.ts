import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Query
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';

import { ApiBody, ApiHeaders, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SaveUserDto } from './dto/save-user.dto';
import { VerifySignature } from 'src/utils/verify-signature.decorator';

@ApiTags('User')
@Controller('user')
@ApiHeaders([{ name: 'x-signature', required: true }])
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('')
  @ApiBody({ type: SaveUserDto })
  @VerifySignature()
  async saveUser(
    @Req() req: Request,
    @Body() data: SaveUserDto,
  ) {
    return await this.userService.saveUser({ ...data, walletAddress: req['recoveredAddress'] });
  }

  @Get('')
  @VerifySignature()
  async getUser(
    @Req() req: Request,
  ) {
    return await this.userService.getUser(req['recoveredAddress']);
  }
}
