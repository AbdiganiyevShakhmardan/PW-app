import { Injectable } from '@angular/core';
import { AuthBackend } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class Backend {

    constructor(public auth: AuthBackend) { }
}
