import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../../../../../apps/client/src/app/providers/services/helper.service';
import { Router } from '@angular/router';
import { User } from '@pw/core';

@Component({
    selector: 'ui-toolbar',
    templateUrl: './ui-toolbar.component.html',
    styleUrls: ['./ui-toolbar.component.scss']
})
export class UiToolbarComponent implements OnInit {

    get isAuth(): boolean {
        return this.helper.isAuth();
    }

    get user(): User {
        return this.helper.user();
    }

    constructor(private helper: HelperService, private router: Router) { }

    ngOnInit() {
    }

    signOut() {
        this.helper.signOut();
        this.router.navigate(['/auth/login']);
    }

}
