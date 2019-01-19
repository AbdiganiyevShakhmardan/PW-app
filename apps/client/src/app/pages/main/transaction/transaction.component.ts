import { Component, Injector, OnInit } from '@angular/core';
import { Abstract } from '../../abstract';
import { UserListRM } from '@pw/core';

@Component({
    selector: 'pw-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends Abstract implements OnInit {

    constructor(injector: Injector) {super(injector);}

    ngOnInit() {
    }

    async userInfo() {
        try {
            const res = await this.backend.user.userInfo();
        } catch (e) {

        } finally {

        }
    }

    async userList() {
        const model = new UserListRM({
            name: 'sean',
            amount: 500
        });

        try {
            const res = await this.backend.user.userList(model);
        } catch (e) {

        } finally {

        }
    }

}
