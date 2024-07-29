import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from '../models/wallet.schema';
import { RedisModule } from 'apps/user/src/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'wallet',
        schema: WalletSchema,
      },
    ]),
    RedisModule
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
