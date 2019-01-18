import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Backend } from '@pw/backend';

@Component({
    selector: 'pw-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form = new FormGroup({
        email: new FormControl(),
        password: new FormControl(),
    });

    constructor(private backend: Backend) { }

    ngOnInit() {
    }

    async login() {
        const res = await this.backend.auth.login(this.form.value);
        console.log(res);
    }

}
