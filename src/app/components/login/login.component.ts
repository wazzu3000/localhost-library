import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from './../../services/session.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent {
    public name: string;
    public formDirty: boolean;

    @ViewChild('loginForm', { static: true })
    public loginForm: NgForm;

    public constructor(private router: Router, private session: SessionService) { }

    public login() {
        this.formDirty = true;
        if (this.loginForm.invalid) {
            return;
        }

        this.session.userName = this.name;
        this.router.navigateByUrl('/library');
    }
}