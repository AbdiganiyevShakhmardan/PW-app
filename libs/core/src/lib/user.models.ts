import { User } from '@pw/core';

export class UserListRM {
    filter: string;

    constructor(...models: Partial<UserListRM>[]) {
        Object.assign(this, ...models);
    }
}
