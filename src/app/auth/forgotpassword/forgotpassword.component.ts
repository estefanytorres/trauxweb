import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthUser} from '../../../models/auth_user.model';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['../auth.css']
})
export class ForgotpasswordComponent implements OnInit {

  public email_form: FormGroup;
  public password_form: FormGroup;
  public instructions: string;
  public submitted: boolean;
  public authUser: AuthUser;
  public password_check: string;
  public alertType: string;
  public showAlert: boolean;
  public alertMessage: string;
  public pAction: string;
  public pUid: string;
  public pToken: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pAction = params['action'];
      this.pUid = params['uid'];
      this.pToken = params['token'];
    });

    if (this.pAction === 'reset') {
      this.instructions = 'Ingrese su nueva contraseña';
    } else {
      this.instructions = 'Ingrese el correo electrónico asociado con su cuenta';
    }

    this.authUser = new AuthUser();
    this.showAlert = false;
    this.submitted = false;
    this.email_form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]]
    });
    this.password_form = this.formBuilder.group({
      password: ['', [Validators.required]],
      password_check: ['', [Validators.required]]
    });
  }

  get ef() { return this.email_form.controls; }
  get pf() { return this.password_form.controls; }

  emailResetPassword() {
    this.submitted = true;
    if (this.email_form.invalid) {
      return;
    }
    this.authService.email_reset_password(this.authUser).subscribe(data => {
      this.alertMessage = data['message'];
      this.alertType = 'success';
      this.showAlert = true;
    }, error => {
      this.alertMessage = error.error.message;
      this.alertType = 'danger';
      this.showAlert = true;
    });
  }

  resetPassword() {
    this.submitted = true;
    if (this.password_form.controls.password.value !== this.password_form.controls.password_check.value) {
      this.password_form.controls.password.setErrors({'required': true});
      this.password_form.controls.password_check.setErrors({'required': true});
      this.alertType = 'danger';
      this.alertMessage = 'Las contraseñas ingresadas no coinciden';
      this.showAlert = true;
    }
    if (this.password_form.invalid) {
      return;
    }
    this.authService.reset_password(this.authUser, this.pUid, this.pToken).subscribe(data => {
      this.authUser.username = data['data']['username'];
      this.authService.login(this.authUser)
        .subscribe(success => {
          if (success) {
            this.router.navigate(['/dashboard']).finally();
          } else {
            this.showAlert = true;
            this.alertMessage = 'Su contraseña fue reestablecida con éxito!';
            this.alertType = 'success';
          }
        });
    }, error => {
      console.log(error);
      this.alertMessage = error['error']['message'];
      this.alertType = 'danger';
      this.showAlert = true;
    });
  }

}
