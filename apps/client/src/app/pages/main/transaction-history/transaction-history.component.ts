import { Component, Injector, OnInit } from '@angular/core';
import { Abstract } from '../../abstract';
import { Transaction, UserTransactionResponseModel } from '@pw/core';
import { UrlTree } from '@angular/router';

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
            }
        } catch (e) {

        } finally {

        }
    }

    repeatTransaction(transaction: Transaction) {
        const urlTree = new UrlTree();
        urlTree.queryParams = {
            name: transaction.username,
            amount: transaction.amount*(-1)
        };
        this.router.navigate(['/transaction/transfer'], {queryParams: urlTree.queryParams});
    }

}
