export class SignInRM {
    username: string;
    password: string;

    constructor(...models: Partial<SignInRM>[]) {
        Object.assign(this, ...models);
    }
}

export class SignUpRM {
    username: string;
    password: string;
    email: string;

    constructor(...models: Partial<SignUpRM>[]) {
        Object.assign(this, ...models);
    }
}
