import { Injectable } from '@angular/core';
import { BaseDataSourceStrategy } from './data-sources/base-data-source-strategy';
import { Transaction } from './interfaces/transaction';
import { DataSourceType } from './enum/data-source-type';
import { Observable, ReplaySubject } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

@Injectable({  providedIn: 'root' })
export class TransactionService {
    private transactionsSource = new ReplaySubject<Transaction[]>(1);

    constructor(
        private dataSource: BaseDataSourceStrategy,
    ) { }

    getTransactionsObservable() {
        return this.transactionsSource.asObservable();
    }

    create(transaction: Transaction): Observable<void> {
        return this.dataSource.storeItem<Transaction>(DataSourceType.Transactions, transaction)
            .pipe(
                flatMap(() => this.getAll()), // Calling "getAll" to keep the observable updated
                map(() => {}),
            );
    }

    getAll() {
        return this.dataSource.getAll<Transaction>(DataSourceType.Transactions)
            .pipe(
                map((transactions: Transaction[]) => transactions.map((transaction) => Object.assign({
                    ...transaction,
                    createdAt: new Date(transaction.createdAt),
                }))),
                tap((transactions: Transaction[]) => this.transactionsSource.next(transactions))
            );
    }
}
