import { Component, Injector, OnInit } from '@angular/core';
import { Abstract } from '../../abstract';

@Component({
    selector: 'pw-transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent extends Abstract implements OnInit {

    constructor(injector: Injector) {super(injector)}

    ngOnInit() {
        this.getTransaction();
    }

    async getTransaction() {
        try {
            const res = await this.backend.transaction.userTransactions();
            console.log(res);
        } catch (e) {

        } finally {

        }
    }

}
