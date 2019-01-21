import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Abstract } from '../../abstract';
import { ValidationErrors } from '@angular/forms/src/directives/validators';
import { SigningResponseModel, SignUpRM } from '@pw/core';

export const passwordMatcher = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('pass').value;
    const passRep = control.get('passRep').value;

    return password === passRep ? null : { noMatch: true }
};

@Component({
    selector: 'pw-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends Abstract implements OnInit {

    regForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        pass: ['', Validators.required],
        passRep: ['', [Validators.required]]
    }, { validator: passwordMatcher });

    submitted = false;
    query = false;

    get f(): any { return this.regForm.controls; }

    constructor(injector: Injector, private fb: FormBuilder) {super(injector);}

    ngOnInit() {
    }

    async register() {
        this.submitted = true;
        if(this.regForm.invalid) {
            return;
        }

        const model = new SignUpRM({
            username: this.f.username.value,
            email: this.f.email.value,
            password: this.f.pass.value
        });

        this.query = true;
        try {
            const res = await this.backend.auth.signUp(model);
            if(res instanceof SigningResponseModel) {
                this.helper.successAuth(res.id_token);
                this.router.navigate(['/transaction']);
            }
        } catch (e) {

        } finally {
            this.query = false;
        }
    }

}
