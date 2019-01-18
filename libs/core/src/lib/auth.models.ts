export class SignInRM {
    username: string;
    password: string;

    constructor(...models: Partial<SignInRM>[]) {
        Object.assign(this, ...models);
    }
}
