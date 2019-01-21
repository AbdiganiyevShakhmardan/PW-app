import { Component, Injector, OnInit } from '@angular/core';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { User } from '@pw/core';
import { Abstract } from '../../abstract';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
    selector: 'pw-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent extends Abstract implements OnInit {

    showArrow = false;
    childComp: any;

    get header(): string {
        return !this.showArrow ? 'Recent transactions' : 'Transfering'
    }

    get user(): User {
        return this.helper.user();
    }

    constructor(injector: Injector) {super(injector);}

    ngOnInit() {
    }

    activated(comp) {
        this.childComp = comp;
        if(comp instanceof TransactionHistoryComponent) {
            this.showArrow = false;
        } else {
            this.showArrow = true;
        }
    }

    goToTransfer() {
        if(!(this.childComp instanceof TransactionComponent)) {
            this.router.navigate(['/transaction/transfer']);
        }
    }

}
