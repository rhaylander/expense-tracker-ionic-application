import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionType } from '../shared/enum/transaction-type';
import { OnsNavigator } from 'ngx-onsenui';
import { finalize, take } from 'rxjs/operators';
import { TransactionService } from '../shared/transaction-service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
        receipt: [null],
    });

    constructor(
        private camera: Camera,
        private formBuilder: FormBuilder,
        private navigator: OnsNavigator,
        private transactionService: TransactionService,
    ) { }

    save() {
        const { description, receipt, transactionType } = this.transactionForm.value;
        const amount = Math.abs(parseFloat(this.transactionForm.value.amount));

        return this.transactionService.create({
            description,
            receipt,
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

    takePictureOfReceipt() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.transactionForm.patchValue({ receipt: `data:image/jpeg;base64,${imageData}` });
        }, (err) => {
            console.log(err);
        });
    }
}
