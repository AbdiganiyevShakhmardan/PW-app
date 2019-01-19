export class Transaction {
    id: string;
    date: Date;
    username: string;
    amount: number;
    balance: number;

    constructor(...models: Partial<Transaction>[]) {
        Object.assign(this, ...models);
    }
}
