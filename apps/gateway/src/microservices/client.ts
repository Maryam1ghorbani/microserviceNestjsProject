import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const microserviceClients = ClientsModule.registerAsync([
  {
    name: 'wallet',
    useFactory: (config: ConfigService) => {
      return {
        transport: Transport.GRPC,
        options: {
          package: 'wallet',
          url: '0.0.0.0:8080',
          protoPath: [
            join(
              __dirname,
              '../../../../apps/gateway/src/grpc/proto/transaction/wallet.proto',
            ),
          ],
        },
      };
    },
    imports: [ConfigModule],
    inject: [ConfigService],
  },
  {
    name: 'user',
    useFactory: (config: ConfigService) => {
      return {
        transport: Transport.GRPC,
        options: {
          package: 'user',
          url: '0.0.0.0:5000',
          protoPath: [
            join(
              __dirname,
              '../../../../apps/gateway/src/grpc/proto/user/user.proto',
            ),
          ],
        },
      };
    },
    imports: [ConfigModule],
    inject: [ConfigService],
  },
]);
