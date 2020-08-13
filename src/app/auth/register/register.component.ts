import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthUser} from '../../../models/auth_user.model';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public password_check: string;
  public submitted: boolean;
  public authUser: AuthUser;
  public showAlert: boolean;
  public alertType: string;
  public alertMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authUser = new AuthUser();
    this.password_check = '';
    this.showAlert = false;
    this.submitted = false;
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_check: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      license: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.controls.password.value !== this.form.controls.password_check.value) {
      this.form.controls.password.setErrors({'required': true});
      this.form.controls.password_check.setErrors({'required': true});
      this.alertType = 'danger';
      this.alertMessage = 'Las contraseñas ingresadas no coinciden';
      this.showAlert = true;
    }
    if (this.form.invalid) {
      return;
    }
    this.authService.register(this.authUser)
      .subscribe(data => {
        this.alertType = 'success';
        if (data['code'] === 1) {
          this.alertMessage = 'Su cuenta ha sido registrada con exito! por favor siga las instrucciones enviadas su correo electrónico';
        } else {
          this.alertMessage = 'Su cuenta ha sido registrada con exito! por favor siga las instrucciones enviadas al correo registrado ' +
            'para su licencia ' + data['data']['email'];
        }
        this.showAlert = true;
      }, error => {
        if (!environment.production) { console.log(error); }
        this.alertType = 'danger';
        if (error.error.code === 1) {
          this.form.controls.license.setErrors({'doesnotexist': true});
          this.alertMessage = 'La licencia ingresada no concuerda con nuestros registros, por favor revise los datos e intente nuevamente';
        } else if (error.error.code === 2) {
          this.form.controls.username.setErrors({'doesnotexist': false});
          this.alertMessage = 'Ya existe una cuenta registrada para este correo electrónico, si olvidó su contraseña por favor siga las ' +
            'instrucciones de esta opcion al iniciar sesión';
        } else {
          this.alertMessage = 'Ocurrió un error al procesar su solicitud, por favor intente de nuevo mas tarde';
        }
        this.showAlert = true;
      });
  }

}
