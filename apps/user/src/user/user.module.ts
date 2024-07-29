import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from '../models/user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema: UserSchema,
      },
    ]),
    RedisModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
