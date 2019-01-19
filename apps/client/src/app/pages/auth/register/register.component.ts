import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'pw-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    regForm = new FormGroup({
        username: new FormControl(),
        email: new FormControl(),
        pass: new FormControl(),
        passRep: new FormControl()
    });

    constructor() { }

    ngOnInit() {
    }

    register() {}

}
