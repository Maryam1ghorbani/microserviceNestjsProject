import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:8080',
        package: 'wallet',
        protoPath: [
          join(
            __dirname,
            '../../../../apps/transaction/src/grpc/proto/wallet.proto',
          ),
        ],
      },
    },
  );
  app.listen().then(() => {
    console.log('wallet microservice is running');
  });
}

bootstrap();
