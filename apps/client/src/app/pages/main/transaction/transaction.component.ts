import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Abstract } from '../../abstract';
import { CreateTransactionRM, User, UserListRM } from '@pw/core';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { UiInputComponent } from '@pw/ui-shared';

declare let alertify: any;

@Component({
    selector: 'pw-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent extends Abstract implements OnInit {

    @ViewChild('autocomplete') autocomplete: UiInputComponent;
    autocompleteSelected = false;

    users: User[] = [];

    trForm = this.fb.group({
        name: ['', [Validators.required]],
        amount: [null, Validators.required]
    });

    submitted = false;
    query = false;

    get f(): any { return this.trForm.controls; }

    constructor(injector: Injector, private fb: FormBuilder) {super(injector);}

    ngOnInit() {
        this.trForm.get('name').valueChanges.pipe(
            debounceTime(300),
            takeUntil(this.stopSubject.asObservable())
        ).subscribe(this.userList.bind(this));
    }

    autocompleteDisplay(item: any) {
        return item.name;
    }

    async userInfo() {
        try {
            const res = await this.backend.user.userInfo();
        } catch (e) {

        } finally {

        }
    }

    async userList(value: string) {
        if (value === "" || value == null || value.length < 1 || this.autocompleteSelected) {
            this.autocompleteSelected = false;
            return;
        }
        const model = new UserListRM({
            filter: value
        });

        try {
            const res = await this.backend.user.userList(model);
            this.users = res;
            this.autocomplete.showAutocomplete(this.users);
        } catch (e) {

        } finally {

        }
    }

    autocompleteSelectedHandler(v: User) {
        this.autocompleteSelected = true;
        this.f.name.setValue(v.name);

        if (this.autocomplete) {
            this.autocomplete.closeAutocomplete();
        }
    }

    async createTransaction() {
        this.submitted = true;
        if(this.trForm.invalid) {
            return;
        }

        this.query = true;
        const model = new CreateTransactionRM({
            name: this.f.name.value,
            amount: this.f.amount.value
        });

        try {
            const res = await this.backend.transaction.createTransaction(model);
            alertify.success('Transfered successfully');
            this.router.navigate(['/transaction']);
        } catch (e) {

        } finally {
            this.query = false;
        }
    }

}
