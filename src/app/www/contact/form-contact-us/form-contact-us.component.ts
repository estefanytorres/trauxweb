import { Component, OnInit } from '@angular/core';
import { ApiService} from '../../../../services/api.service';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebConsult } from '../../../../models/web_consult.model';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-contact-us',
  templateUrl: './form-contact-us.component.html',
  providers: [ ApiService, HttpClient ]
})

export class FormContactUsComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean;
  public webConsult: WebConsult;
  public alertType: string;
  public showAlert: boolean;
  public alertMessage: string;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}


  ngOnInit() {
    this.webConsult = new WebConsult('C', '', '', '', '', '');
    this.showAlert = false;
    this.submitted = false;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', []],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', []],
      describe: ['', []],
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (!environment.production) {
      console.log(this.webConsult);
    }
    this.api.insertWebConsult(this.webConsult).subscribe(
      data => {
        this.alertMessage = 'Gracias por contactarnos!  uno de nuestros representantes se comunicará con usted muy pronto.';
        this.alertType = 'success';
        this.showAlert = true;
        this.submitted = false;
        this.webConsult = new WebConsult('C', '', '', '', '', '');
        setTimeout(() => this.showAlert = false, 5000);
        return true;
      },
      error => {
        this.alertMessage = 'Ocurrió un error al enviar el mensaje, por favor intente de nuevo más tarde o comuníquese directamente a ';
        this.alertType = 'danger';
        this.showAlert = true;
        this.submitted = false;
        this.webConsult = new WebConsult('C', '', '', '', '', '');
        setTimeout(() => this.showAlert = false, 60000);
        if (!environment.production) {
          console.log(environment.name);
          console.log(this.webConsult);
          return throwError(error);
        } else {
          return false;
        }
      }
    );
  }
}
