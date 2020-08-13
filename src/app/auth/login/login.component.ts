import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../../../models/auth_user.model';
import { AuthService } from '../../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
  providers: [ AuthService, HttpClient ]
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean;
  public authUser: AuthUser;
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
    if (this.pAction === 'activate') {
      this.authService.activate(this.pUid, this.pToken).subscribe(data => {
          this.alertMessage = 'Su cuenta ha sido activada con exito! por favor inicie sesión';
          this.alertType = 'success';
          this.showAlert = true;
        }, error => {
          this.alertMessage = 'Ocurrió un error al activar su cuenta, por favor intente de nuevo o contáctenos a ' +
            'webmaster@trauxerp.com';
          this.alertType = 'danger';
          this.showAlert = true;
        });
    } else {
      this.pAction = null;
    }

    this.authUser = new AuthUser();
    this.showAlert = false;
    this.submitted = false;
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.login(this.authUser)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/dashboard']).finally();
        } else {
          this.showAlert = true;
          this.alertMessage = 'Las credenciales ingresadas no concuerdan con nuestros registros, por favor verifique la información e ' +
            'intente de nuevo';
          this.alertType = 'danger';
          this.submitted = false;
        }
      });
  }

}
