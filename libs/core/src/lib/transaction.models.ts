import { Transaction } from './models/transaction';

export class UserTransactionResponseModel {
    trans_token: Transaction[];

    constructor(...models: Partial<UserTransactionResponseModel>[]) {
        Object.assign(this, ...models);

        if(this.trans_token) {
            this.trans_token = this.trans_token.map(i => new Transaction(i));
        }
    }
}

export class CreateTransactionRM {
    name: string;
    amount: number;

    constructor(...models: Partial<CreateTransactionRM>[]) {
        Object.assign(this, ...models);
    }
}

export class CreateTransactionResponseModel {
    trans_token: Transaction;

    constructor(...models: Partial<CreateTransactionResponseModel>[]) {
        Object.assign(this, ...models);

        if(this.trans_token) {
            this.trans_token = new Transaction(this.trans_token);
        }
    }
}
