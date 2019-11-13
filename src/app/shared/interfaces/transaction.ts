import { TransactionType } from '../enum/transaction-type';

export interface Transaction {
    amount: number;
    createdAt: Date;
    description: string;
    transactionType: TransactionType;
}
