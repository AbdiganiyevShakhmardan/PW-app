import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizedService } from '../services/authorized.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

    constructor(private router: Router, private isAuth: AuthorizedService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        const isAuth = this.isAuth.isAuth();

        if(isAuth) {
            this.router.navigate(['/transaction']);

            return false;
        }

        return true;
    }
}
