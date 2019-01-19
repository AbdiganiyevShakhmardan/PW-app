import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedService {

    constructor() { }

    successAuth(token: string): void {
        localStorage.setItem('token', token);
    }

    isAuth(): boolean {
        return localStorage.getItem('token') ? true : false;
    }
}
