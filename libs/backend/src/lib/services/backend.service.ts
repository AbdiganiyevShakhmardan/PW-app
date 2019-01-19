import { Injectable } from '@angular/core';
import { AuthBackend } from './auth.service';
import { TransactionBackend } from './transaction.service';
import { UserBackend } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class Backend {

    constructor(public auth: AuthBackend,
                public transaction: TransactionBackend,
                public user: UserBackend) { }
}
