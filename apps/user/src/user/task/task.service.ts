import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RedisService } from '../../redis/redis.service';
import { lastValueFrom } from 'rxjs';
import { WalletServiceClient } from '../../grpc/types/transaction/wallet';
import {
  ChangeBalanceDTO,
  GetAmountDTO,
  SetAmountDTO,
  UpdateAmountDTO,
} from '../../grpc/types/user';

@Injectable()
export class TaskService {
  private walletService: WalletServiceClient;
  constructor(
    @Inject('wallet') private readonly wallet: ClientGrpc,
    private readonly redis: RedisService,
  ) {
    this.walletService = this.wallet.getService('SatPayService');
  }

  public async setAmount(data: SetAmountDTO) {
    const amount = await lastValueFrom(
      this.walletService.findWallet({
        userId: data.userId,
      }),
    );
    await this.redis.client.setex(`wallet:${data.userId}`, amount);
  }

  public async getAmount(data: GetAmountDTO) {
    const amount = await this.redis.client.get(`wallet:${data.userId}`);
    return amount ? Number(amount) : 0;
  }

  public async changeBalance(data: ChangeBalanceDTO) {
    if (data.amount >= 0) {
      return await this.redis.client.incrbyfloat(
        `wallet:${data.userId}:balance`,
        data.amount,
      );
    } else if (data.amount < 0) {
      return await this.redis.client.decrbyfloat(
        `wallet:${data.userId}:balance`,
        data.amount,
      );
    }
  }

  public async updateAmount(data: UpdateAmountDTO) {
    const amount = await this.redis.client.get(`wallet:${data.userId}`);
    this.walletService.updateWallet({
      userId: data.userId,
      amount:amount
    });
  }
}
