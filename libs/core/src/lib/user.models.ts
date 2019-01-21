import { User } from './models/user';

export class UserListRM {
    filter: string;

    constructor(...models: Partial<UserListRM>[]) {
        Object.assign(this, ...models);
    }
}

export class UserInfoResponseModel {
    user_info_token: User;

    constructor(...models: Partial<UserInfoResponseModel>[]) {
        Object.assign(this, ...models);

        if(this.user_info_token) {
            this.user_info_token = new User(this.user_info_token);
        }
    }
}
