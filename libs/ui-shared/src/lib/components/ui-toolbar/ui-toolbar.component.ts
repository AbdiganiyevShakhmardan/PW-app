import { Component, OnInit } from '@angular/core';
import { AuthorizedService } from '../../../../../../apps/client/src/app/providers/services/authorized.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './ui-toolbar.component.html',
    styleUrls: ['./ui-toolbar.component.scss']
})
export class UiToolbarComponent implements OnInit {

    get isAuth(): boolean {
        return this.isAuthService.isAuth();
    }

    constructor(private isAuthService: AuthorizedService, private router: Router) { }

    ngOnInit() {
    }

    signOut() {
        this.isAuthService.signOut();
        this.router.navigate(['/auth/login']);
    }

}
