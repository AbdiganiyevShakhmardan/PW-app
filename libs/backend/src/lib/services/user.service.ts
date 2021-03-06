import { Injectable } from '@angular/core';
import { environment } from '../../../../../apps/client/src/environments/environment';
import { User, UserListRM, UserInfoResponseModel } from '@pw/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserBackend {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    userInfo() {
        return this.http.get<UserInfoResponseModel>(`${this.apiUrl}/api/protected/user-info`).pipe(
            map(r => r ?  new UserInfoResponseModel(r) : null)
        ).toPromise()
    }

    userList(model: UserListRM) {
        return this.http.post<User[]>(`${this.apiUrl}/api/protected/users/list`, model).pipe(
            map(r => r ?  r.map(v => new User(v)) : null)
        ).toPromise()
    }
}
