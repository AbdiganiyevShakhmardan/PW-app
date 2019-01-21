import { Injectable } from '@angular/core';
import { Transaction, User } from '@pw/core';
import { Backend } from '@pw/backend';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor(private backend: Backend) { }

    async userInfo() {
        try {
            const res = await this.backend.user.userInfo();
            localStorage.setItem('user', JSON.stringify(res.user_info_token));
        } catch (e) {

        } finally {

        }
    }

    successAuth(token: string): void {
        localStorage.setItem('token', token);
        this.userInfo();
    }

    isAuth(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    signOut(): void {
        localStorage.removeItem('token');
    }

    user(): User {
        if(!this.isAuth) {return;}
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    setUser(user: User) {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
    }
}
