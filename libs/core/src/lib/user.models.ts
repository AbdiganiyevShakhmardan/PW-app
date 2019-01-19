export class UserListRM {
    name: string;
    amount: number;

    constructor(...models: Partial<UserListRM>[]) {
        Object.assign(this, ...models);
    }
}
