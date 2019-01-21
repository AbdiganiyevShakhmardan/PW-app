import { Injectable } from '@angular/core';
import { User } from '@pw/core';
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

    filter(arr) {
        const result = [];
        for(let j = 0; j < arr.length - 1; j++) {
            for(let i = j+1; i < arr.length; i++) {
                if(arr[j].id === arr[i].id) {
                    result.push(arr[j]); break;
                }
            }
        }

        return result;
    }

    sort(arr, type: 'byName' | 'byAmount', reverse: boolean) {
        if(type === 'byName') {
            arr.sort((a,b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0));

            return reverse ? arr.reverse() : arr;
        } else {
            arr.sort((a,b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0));

            return reverse ? arr.reverse() : arr;
        }
    }
}
