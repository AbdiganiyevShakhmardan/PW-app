import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Abstract } from '../../abstract';

@Component({
    selector: 'pw-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends Abstract implements OnInit {

    regForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        pass: ['', Validators.required],
        passRep: ['', [Validators.required]]
    });

    submitted = false;

    get f(): any { return this.regForm.controls; }

    constructor(injector: Injector, private formBuilder: FormBuilder) {super(injector);}

    ngOnInit() {
    }

    register() {
        this.submitted = true;
        if(this.regForm.invalid) {
            return;
        }

        console.log(this.regForm);
    }

}
