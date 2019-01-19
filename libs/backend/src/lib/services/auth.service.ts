import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../apps/client/src/environments/environment';
import { SigningResponseModel, SignInRM, SignUpRM } from '@pw/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthBackend {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){}

    signIn(model: SignInRM) {
        return this.http.post<SigningResponseModel>(`${this.apiUrl}/sessions/create`, model).pipe(
            map(r => r ? new SigningResponseModel(r) : null)
        ).toPromise()
    }

    signUp(model: SignUpRM) {
        return this.http.post<SigningResponseModel>(`${this.apiUrl}/users`, model).pipe(
            map(r => r ? new SigningResponseModel(r) : null)
        ).toPromise()
    }
}
