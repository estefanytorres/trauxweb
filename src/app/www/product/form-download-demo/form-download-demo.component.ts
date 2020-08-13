import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { throwError } from 'rxjs';
import { WebConsult } from '../../../../models/web_consult.model';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-download-demo',
  templateUrl: './form-download-demo.component.html'
})

export class FormDownloadDemoComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean;
  public webConsult: WebConsult;
  public alertType: string;
  public showAlert: boolean;
  public alertMessage: string;

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.webConsult = new WebConsult('D', '', '', '', '', '');
    this.showAlert = false;
    this.submitted = false;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', []],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', []],
    });
  }

  get f() { return this.form.controls; }

  onSubmit () {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    if (!environment.production) {
      console.log(this.webConsult);
    }
    this.api.insertWebConsult(this.webConsult).subscribe(
      data => {
        this.alertMessage = 'Gracias por su interés en nuestro DEMO, hemos enviado una copia de nuestro demo con una licencia ' +
          'provisional por tres meses a su correo';
        this.alertType = 'success';
        this.showAlert = true;
        this.submitted = false;
        this.webConsult = new WebConsult('D', '', '', '', '', '');
        setTimeout(() => this.showAlert = false, 5000);
        return true;
      },
      error => {
        this.alertMessage = 'Ocurrió un error al procesar su solicitud, por favor intente de nuevo más tarde o comuníquese directamente a ';
        this.alertType = 'danger';
        this.showAlert = true;
        this.submitted = false;
        this.webConsult = new WebConsult('D', '', '', '', '', '');
        setTimeout(() => this.showAlert = false, 60000);
        if (!environment.production) {
          console.log(this.webConsult);
          return throwError(error);
        } else {
          return false;
        }
      }
    );
  }
}
