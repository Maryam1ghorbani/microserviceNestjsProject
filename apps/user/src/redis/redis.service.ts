import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnApplicationBootstrap {
  constructor(private readonly config: ConfigService) {}
  private redisClient: Redis.Redis;

  public get client(): Redis.Redis {
    return this.redisClient;
  }

  onApplicationBootstrap(): void {
    this.redisClient = new Redis(
      this.config.get('db.redis.port'),
      this.config.get('db.redis.host'),
    );
  }
}
