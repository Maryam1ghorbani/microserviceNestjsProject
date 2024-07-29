import { Module } from '@nestjs/common';
import { UserModule } from './user-service/user/user.module';
import { MicroservicesModule } from './microservices/microservice.module';

@Module({
  imports: [MicroservicesModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
