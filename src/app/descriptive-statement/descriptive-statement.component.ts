import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { forEachRight, orderBy } from 'lodash';
import { RegisterTransactionComponent } from '../register-transaction/register-transaction.component';
import { Transaction } from '../shared/interfaces/transaction';
import { map, take } from 'rxjs/operators';
import { TransactionService } from '../shared/transaction-service';
import { Observable } from 'rxjs';

@Component({
    selector: 'ons-page[descriptive-statement]',
    templateUrl: './descriptive-statement.component.html',
    styleUrls: ['./descriptive-statement.component.scss']
})
export class DescriptiveStatementComponent implements OnInit {
    $transactions: Observable<Transaction[]>;
    balance: number = 0;

    constructor(
        private navigator: OnsNavigator,
        private transactionService: TransactionService,
    ) { }

    ngOnInit() {
        this.$transactions = this.transactionService.getTransactionsObservable()
            .pipe(map((transactions: Transaction[]) => {
                const sortedTransactions = orderBy(transactions, 'createdAt', 'desc');

                this.balance = 0;
                forEachRight(sortedTransactions, (transaction) => {
                    this.balance += transaction.amount;
                });

                return sortedTransactions;
            }));

        this.transactionService.getAll()
            .pipe(take(1))
            .subscribe(
                null,
                (error) => {
                console.error(error);
                alert('Failed to load transactions. Please, refresh your page and try again. If the error persists, clear you cache.');
            });
    }

    push() {
        this.navigator.element.pushPage(RegisterTransactionComponent);
    }

}
