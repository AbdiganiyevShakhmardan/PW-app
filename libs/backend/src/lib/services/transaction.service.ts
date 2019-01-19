import { Injectable } from '@angular/core';
import { environment } from '../../../../../apps/client/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateTransactionRM, CreateTransactionResponseModel, UserTransactionResponseModel } from '@pw/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TransactionBackend {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    userTransactions() {
        return this.http.get<UserTransactionResponseModel>(`${this.apiUrl}/api/protected/transactions`).pipe(
            map(r => r ? new UserTransactionResponseModel(r) : null)
        ).toPromise()
    }

    createTransaction(model: CreateTransactionRM) {
        return this.http.post<CreateTransactionResponseModel>(`${this.apiUrl}/api/protected/transactions`, model).pipe(
            map(r => r ? new CreateTransactionResponseModel(r) : null)
        ).toPromise()
    }
}
