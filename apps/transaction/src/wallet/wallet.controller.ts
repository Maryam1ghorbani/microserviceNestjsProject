import { Controller } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  CreateWalletDTO,
  FindWalletDTO,
  UpdateWalletDTO,
} from '../grpc/types/wallet';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @GrpcMethod('WalletService', 'createWallet')
  public async createWallet(data: CreateWalletDTO) {
    console.log('okkkk');
    return this.walletService.createWallet(data);
  }
  @GrpcMethod('WalletService', 'findWallet')
  public async findWallet(data: FindWalletDTO) {
    return this.walletService.findWallet(data);
  }
  @GrpcMethod('WalletService', 'updateWallet')
  public async updateWallet(data: UpdateWalletDTO) {
    return this.walletService.updateWallet(data);
  }
}
