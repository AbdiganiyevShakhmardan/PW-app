import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Abstract } from '../../abstract';
import { SigningResponseModel } from '@pw/core';

declare let alertify: any;

@Component({
    selector: 'pw-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Abstract implements OnInit {

    logForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    submitted = false;
    query = false;

    get f(): any { return this.logForm.controls; }

    constructor(injector: Injector, private fb: FormBuilder) {super(injector);}

    ngOnInit() {
    }

    async login() {
        this.submitted = true;
        if(this.logForm.invalid) {
            return;
        }

        this.query = true;
        try {
            const res = await this.backend.auth.signIn(this.logForm.value);
            if(res instanceof SigningResponseModel) {
                this.isAuth.successAuth(res.id_token);
                this.router.navigate(['/transaction']);
            }
        } catch (e) {

        }finally {
            this.query = false;
        }
    }

}
