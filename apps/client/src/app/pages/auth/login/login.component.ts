import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Abstract } from '../../abstract';

@Component({
    selector: 'pw-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Abstract implements OnInit {

    logForm = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(injector: Injector) {super(injector);}

    ngOnInit() {
    }

    async login() {
        // const res = await this.backend.auth.login(this.logForm.value);
        // console.log(res);

        this.router.navigate(['/transaction']);
    }

}
