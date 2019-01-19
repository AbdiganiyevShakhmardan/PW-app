export class User {
    id: string;
    name: string;
    email: string;
    balance: number;

    constructor(...models: Partial<User>[]) {
        Object.assign(this, ...models);
    }
}
