import { Component, Injector, OnInit } from '@angular/core';
import { Abstract } from '../../abstract';
import { Transaction } from '@pw/core';
import { UserTransactionResponseModel } from '@pw/core';

@Component({
    selector: 'pw-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent extends Abstract implements OnInit {

    transactions: Transaction[] = [];

    constructor(injector: Injector) {super(injector)}

    ngOnInit() {
        this.getTransaction();
    }

    async getTransaction() {
        try {
            const res = await this.backend.transaction.userTransactions();
            if(res instanceof UserTransactionResponseModel) {
                this.transactions = res.trans_token;
                console.log(res);
            }
        } catch (e) {

        } finally {

        }
    }

}
