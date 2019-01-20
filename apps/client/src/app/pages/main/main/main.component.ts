import { Component, OnInit } from '@angular/core';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';

@Component({
    selector: 'pw-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    showArrow = false;

    get header() {
        return 'Recent transactions' ? !this.showArrow : 'Transfering'
    }

    constructor() { }

    ngOnInit() {
    }

    activated(a) {
        if(a instanceof TransactionHistoryComponent) {
            this.showArrow = false;
        } else {
            this.showArrow = true;
        }
    }

}
