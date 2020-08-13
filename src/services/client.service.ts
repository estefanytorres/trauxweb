// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// APP
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {}

  getUserLicenses() {
    return this.http.get(environment.api_url + 'client').pipe(
      map(data => {
        const license_array = [];
        const clients = data['results']
        for (const key in clients) {
          if (key) {
            const licenses = clients[key]['license_set'];
            for (const license in licenses) {
              if (license) {
                const license_object = licenses[license];
                license_object['client'] = clients[key]['name']
                license_array.push(license_object);
              }
            }
          }
        }
        return license_array;
      })
    );
  }

}
