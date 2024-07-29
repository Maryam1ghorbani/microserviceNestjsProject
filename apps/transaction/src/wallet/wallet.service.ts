import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WalletDocument } from '../models/wallet.interface';
import { Model } from 'mongoose';
import {
  CreateWalletDTO,
  FindWalletDTO,
  UpdateWalletDTO,
} from '../grpc/types/wallet';
import { RedisService } from 'apps/user/src/redis/redis.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('wallet') private readonly walletModel: Model<WalletDocument>,
    private readonly redis: RedisService,
  ) {}
  public async createWallet(data: CreateWalletDTO) {
    console.log('okkkk');
    const wallet = await this.walletModel.findOne({
      userId: data.userId,
    });
    if (wallet) {
      return wallet;
    } else {
      await this.walletModel.create(data);
      const wallet = await this.walletModel.findOne({
        userId: data.userId,
      });
      await this.redis.client.set(`wallet:${data.userId}`, 0);

      return {
        id: wallet._id,
        userId: wallet.userId,
        amount: wallet.amount,
      };
    }
  }
  public async findWallet(data: FindWalletDTO) {
    const wallet = await this.walletModel.findOne(data).lean();
    return {
      id: wallet._id,
      userId: wallet.userId,
      amount: wallet.amount,
    };
  }
  public async updateWallet(data: UpdateWalletDTO) {
    await this.walletModel.updateOne(
      {
        userId: data.userId,
      },
      data,
      { new: true },
    );
    const wallet = await this.walletModel.findOne(data).lean();
    return {
      id: wallet._id,
      userId: wallet.userId,
      amount: wallet.amount,
    };
  }
}
