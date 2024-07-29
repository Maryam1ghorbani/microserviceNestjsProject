import { Document, Schema } from 'mongoose';
import { WalletDocument } from './wallet.interface';

export const WalletSchema = new Schema<WalletDocument>(
  {
    amount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, collection: 'Wallet' },
);
