import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDTO,
  FindOneUserDTO,
  UpdateUserDTO,
} from '../grpc/types/user';
import { UserDocument } from '../models/user/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { WalletServiceClient } from '../grpc/types/transaction/wallet';
import { TaskService } from './task/task.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
  private walletService: WalletServiceClient;
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    @Inject('wallet') private wallet: ClientGrpc,
    private readonly redis: RedisService,
  ) {
    this.walletService = this.wallet.getService('WalletService');
  }
  public async createUser(data: CreateUserDTO) {
    const user = await this.userModel.findOne({
      username: data.username,
    });
    if (user) {
      return user;
    } else {
      await this.userModel.create(data);
      const user = await this.userModel.findOne({
        username: data.username,
      });

      const wallet = await lastValueFrom(
        this.walletService.createWallet({ userId: String(user._id) }),
      );

      return user;
    }
  }

  async findOneUser(data: FindOneUserDTO) {
    const user = await this.userModel.findOne({ _id: data.id }).lean();
    const amount = await this.redis.client.get(`wallet:${data.id}`);
    console.log(data.id, amount);
    //const wallet = await lastValueFrom(
    //  this.walletService.findWallet({
    //    userId: data.id,
    //  }),
    //);
    return { ...user, amount: amount };
  }

  async updateUser(data: UpdateUserDTO) {
    if (data.amount) {
      if (data.amount >= 0) {
        console.log(data.amount);
        await this.redis.client.incrbyfloat(`wallet:${data.id}`, data.amount);
      } else if (data.amount < 0) {
        await this.redis.client.decrby(
          `wallet:${data.id}`,
          Math.abs(data.amount),
        );
      }
      const amount = await this.redis.client.get(`wallet:${data.id}`);
      await lastValueFrom(
        this.walletService.updateWallet({
          userId: data.id,
          amount: amount,
        }),
      );
    }
    await this.userModel.updateOne(
      {
        _id: data.id,
      },
      {
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        gender: data.gender,
      },
    );
    const user = await this.userModel.findById({ _id: data.id }).lean();
    const wallet = await lastValueFrom(
      this.walletService.findWallet({
        userId: data.id,
      }),
    );
    return { ...user, amount: wallet.amount };
  }
}
