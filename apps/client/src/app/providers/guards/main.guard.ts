import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from '../services/helper.service';

@Injectable({
    providedIn: 'root'
})
export class MainGuard implements CanActivate {

    constructor(private router: Router, private helper: HelperService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const isAuth = this.helper.isAuth();

        if(!isAuth) {
            this.router.navigate(['/auth/login']);

            return false;
        }

        return true;
    }
}
