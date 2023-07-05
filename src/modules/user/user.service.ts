import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ethers } from 'ethers';
import { Model } from 'mongoose';
import { BaseService } from 'src/common/service/base-service';
import { BaseError } from 'src/utils/base-error';
import { SaveUserDto } from './dto/save-user.dto';
import {
  User,
  UserDocument,
} from './schema/user.schema';

@Injectable()
export class UserService extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async saveUser(data: SaveUserDto & { walletAddress: string }) {
    try {
      const user = await this.findOne({ walletAddress: data.walletAddress });

      if (!user) {
        const newUser = await this.insertOne(data)
        return newUser
      }

      user.name = data.name || user.name
      user.email = data.email || user.email
      user.twitter = data.twitter || user.twitter
      user.instagram = data.instagram || user.instagram
      user.site = data.site || user.site

      const updatedUser = await user.save()
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new BaseError({ message: error.message, statusCode: error.statusCode })
    }
  }

  async getUser(walletAddress: string) {
    try {
      if (!ethers.isAddress(walletAddress)) throw new BaseError({ message: 'Invalid wallet address' })
      const userData = await this.findOne({ walletAddress });
      if (!userData) throw new BaseError({ message: 'Invalid user data' })
      return userData
    } catch (error) {
      console.log(error);
      throw new BaseError({ message: error.message, statusCode: error.statusCode })
    }
  }
}
