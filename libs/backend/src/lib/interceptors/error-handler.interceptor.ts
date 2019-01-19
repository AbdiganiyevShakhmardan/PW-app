import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http/src/response';
import { Observable, throwError } from 'rxjs';

declare let alertify: any;

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    if (error instanceof HttpErrorResponse) {

                        alertify.error(error.error);
                        return throwError(error.error);
                    }
                })
            );

    }
}
