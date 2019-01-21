import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Abstract } from '../../abstract';
import { CreateTransactionResponseModel, CreateTransactionRM, User, UserListRM } from '@pw/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { UiInputComponent } from '@pw/ui-shared';

declare let alertify: any;

export const maxValue = (control: AbstractControl): ValidationErrors | null => {
    const amount = control.get('amount').value;
    const limit = JSON.parse(localStorage.getItem('user')).balance;

    return amount <= limit ? null : { notEnough: true }
};

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
        amount: [null, [Validators.required, Validators.minLength(1)]]
    }, {validator: maxValue});

    submitted = false;
    query = false;

    get f(): any { return this.trForm.controls; }

    get user(): User {
        return this.helper.user();
    }

    constructor(injector: Injector, private fb: FormBuilder) {super(injector);}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if(params.name && params.amount) {
                this.trForm.setValue({
                    name: params.name,
                    amount: params.amount
                });
            } else if(params.name || params.amount) {
                this.router.navigate(['/transaction/transfer']);
            }
        });


        this.trForm.get('name').valueChanges.pipe(
            debounceTime(300),
            takeUntil(this.stopSubject.asObservable())
        ).subscribe(this.userList.bind(this));
    }

    autocompleteDisplay(item: any) {
        return item.name;
    }

    async userList(value: string) {
        if (value === "" || value == null || this.autocompleteSelected) {
            this.autocompleteSelected = false;
            this.autocomplete.closeAutocomplete();
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
            if(res instanceof CreateTransactionResponseModel) {
                alertify.success('Transfered successfully');
                const setUser: User = this.user;
                setUser.balance = res.trans_token.balance;
                this.helper.setUser(setUser);
                this.router.navigate(['/transaction']);
            }
        } catch (e) {

        } finally {
            this.query = false;
        }
    }

}
