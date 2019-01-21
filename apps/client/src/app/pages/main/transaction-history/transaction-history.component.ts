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
    fTransactions: Transaction[] = [];

    name: Transaction[] = [];
    amount: Transaction[] = [];

    _selectedSort: 'byName' | 'byAmount';
    get selectedSort() {
        return this._selectedSort;
    }
    set selectedSort(v) {
        if(v) {
            if(v === this.selectedSort) {
                this.asc = !this.asc;
            } else {this.asc = false}
            this._selectedSort = v;
            this.sort();
        }
    }

    asc = false;
    query = false;

    constructor(injector: Injector) {super(injector)}

    ngOnInit() {
        this.getTransaction();
    }

    async getTransaction() {
        this.query = true;
        try {
            const res = await this.backend.transaction.userTransactions();
            if(res instanceof UserTransactionResponseModel) {
                this.transactions = res.trans_token;

                this.fTransactions = res.trans_token;
                this.name = res.trans_token;
                this.amount = res.trans_token;
            }
        } catch (e) {

        } finally {
            this.query = false;
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

    filterList(search: string, type: 'name' | 'amount') {
        this.fTransactions = [];

        if(type === 'name') {
            this.name = this.transactions.filter(t => t.username.toLowerCase().includes(search.toLowerCase()));
        } else {
            this.amount = this.transactions.filter(t => t.amount.toString().toLowerCase().includes(search.toLowerCase()));
        }

        this.fTransactions = this.helper.filter(this.name.concat(this.amount));
    }

    sort() {
        this.fTransactions = this.helper.sort(this.fTransactions, this.selectedSort, this.asc);
    }

}
