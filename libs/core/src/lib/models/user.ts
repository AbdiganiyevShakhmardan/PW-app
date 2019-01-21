export class User {
    id: number;
    name: string;
    email: string;
    balance: number;

    constructor(...models: Partial<User>[]) {
        Object.assign(this, ...models);
    }
}
