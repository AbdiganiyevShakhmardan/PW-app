import { Injectable } from '@angular/core';
import { environment } from '../../../../../apps/client/src/environments/environment';
import { UserListRM } from '@pw/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserBackend {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    userInfo() {
        return this.http.get<any>(`${this.apiUrl}/api/protected/user-info`).pipe(
            // map(r => r ? new SigningResponseModel(r) : null)
        ).toPromise()
    }

    userList(model: UserListRM) {
        return this.http.post<any>(`${this.apiUrl}/api/protected/users/list`, model).pipe(
            // map(r => r ? new SigningResponseModel(r) : null)
        ).toPromise()
    }
}
