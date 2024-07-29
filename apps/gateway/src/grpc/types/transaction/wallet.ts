import { Observable } from 'rxjs';

export interface CreateWalletDTO {
  userId: string;
}

export interface Wallet {
  id: string;
  userId: string;
  amount: number;
}

export interface FindWalletDTO {
  userId: string;
}

export interface UpdateWalletDTO {
  userId: string;
  amount: number;
}

export interface WalletServiceClient {
  createWallet(request: CreateWalletDTO): Observable<Wallet>;

  findWallet(request: FindWalletDTO): Observable<Wallet>;

  updateWallet(request: UpdateWalletDTO): Observable<Wallet>;
}
