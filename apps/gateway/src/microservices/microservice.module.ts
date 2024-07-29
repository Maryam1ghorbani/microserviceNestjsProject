import { Global, Module } from '@nestjs/common';
import { microserviceClients } from './client';

@Global()
@Module({
  imports: [microserviceClients],
  providers: [],
  exports: [microserviceClients],
})
export class MicroservicesModule {}
