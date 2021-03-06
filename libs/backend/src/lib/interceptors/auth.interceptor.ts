import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = localStorage.getItem('token');
        if (authToken) {
            const request = req.clone({
                setHeaders: {
                    authorization: `bearer ${authToken}`
                }
            });

            return next.handle(request);
        }

        return next.handle(req);
    }

}
