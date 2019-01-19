import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { Backend } from './services/backend.service';
import { AuthBackend } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TransactionBackend } from './services/transaction.service';
import { UserBackend } from './services/user.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ]
})
export class BackendModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BackendModule,
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorHandlerInterceptor,
                    multi: true
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                },
                {
                    provide: Backend,
                    useClass: Backend,
                    deps: [
                        AuthBackend,
                        TransactionBackend,
                        UserBackend
                    ]
                },
                AuthBackend, TransactionBackend, UserBackend
            ]
        };
    }
}
