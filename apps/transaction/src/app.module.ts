import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { loadConfig } from './config/configLoader';
import { WalletModule } from 'apps/transaction/src/wallet/wallet.module';
import { RedisModule } from 'apps/user/src/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          uri: 'mongodb://' + config.get('db.mongodb.uri'),
          dbName: config.get('db.mongodb.name'),
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    WalletModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
