import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../apps/client/src/environments/environment';
import { SignInRM } from '@pw/core';

@Injectable({
    providedIn: 'root'
})
export class AuthBackend {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){ console.log(this.apiUrl)}

    login(model: SignInRM) {
        return this.http.post<any>(`${this.apiUrl}/sessions/create`, model).pipe(
            //map(r => r.code === 0 ? new SignUpResponseModel(r) : new ErrorMessage(r))
        ).toPromise()
    }

    test() {
        console.log(this.apiUrl)
    }
}
