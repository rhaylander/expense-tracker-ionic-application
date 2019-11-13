import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionType } from '../shared/enum/transaction-type';
import { OnsNavigator } from 'ngx-onsenui';
import { finalize, take } from 'rxjs/operators';
import { TransactionService } from '../shared/transaction-service';

@Component({
    selector: 'ons-page[register-transaction]',
    templateUrl: './register-transaction.component.html',
    styleUrls: ['./register-transaction.component.scss']
})
export class RegisterTransactionComponent {
    transactionTypes = [
        { label: 'Deposit', value: TransactionType.Deposit },
        { label: 'Expense', value: TransactionType.Expense },
    ];

    transactionForm = this.formBuilder.group({
        amount: [null, Validators.compose([
            Validators.min(0),
            Validators.required,
        ])],
        description: [null, Validators.required],
        transactionType: ['', Validators.required],
    });

    constructor(
        private formBuilder: FormBuilder,
        private navigator: OnsNavigator,
        private transactionService: TransactionService,
    ) { }

    save() {
        const { description, transactionType } = this.transactionForm.value;
        const amount = Math.abs(parseFloat(this.transactionForm.value.amount));

        return this.transactionService.create({
            description,
            transactionType,
            amount: transactionType === TransactionType.Deposit ? amount : amount * -1,
            createdAt: new Date(),
        })
            .pipe(
                take(1),
                finalize(() => this.navigator.element.popPage())
            )
            .subscribe(
            null,
            (error) => {
                console.error(error);
                alert('Failed to store the transaction. Please, try again.')
            }
        );
    }
}
