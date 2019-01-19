import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Abstract } from '../../abstract';

@Component({
    selector: 'pw-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Abstract implements OnInit {

    logForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });

    submitted = false;

    get f(): any { return this.logForm.controls; }

    constructor(injector: Injector, private formBuilder: FormBuilder) {super(injector);}

    ngOnInit() {
    }

    async login() {
        this.submitted = true;
        if(this.logForm.invalid) {
            return;
        }
        // const res = await this.backend.auth.login(this.logForm.value);
        // console.log(res);

        this.router.navigate(['/transaction']);
    }

}
