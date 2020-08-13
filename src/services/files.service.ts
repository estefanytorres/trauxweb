// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// APP
import { environment } from '../environments/environment';
import {mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) {}

  getTransformedXML(formData) {

    // console.log(formData);

    return this.http.post<any>(environment.api_url + 'file_transaction/', formData);
      // .pipe(
      // mergeMap(file_transaction => this.http.get(environment.api_url + 'file_transaction/' + file_transaction['data']['id'])));
      // mergeMap(file_transaction => this.http.get(environment.api_url + 'media/' + file_transaction['data']['file_name'])));

      //
      // .subscribe(
      // (res) => {
      //   // this.response = res;
      //   // this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
      //   fileTransactionID = res['data']['id'];
      //   console.log(fileTransactionID);
      //   console.log(res);
      //   // console.log(this.imageURL);
      // },
      // (err) => {
      //   console.log(err);
      //   return this.http.get(environment.api_url + 'file_transaction/0');
      // });
  }

}
