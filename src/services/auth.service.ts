import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpService } from './http.service';
import { of, Observable } from 'rxjs';
import {catchError, map, mapTo, tap} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { AuthToken} from '../models/auth_token.model';
import {AuthUser} from '../models/auth_user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  // private user: AuthUser;

  constructor(private http: HttpClient) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(environment.api_url + 'api-token/auth/', user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          if (!environment.production) {
            console.log(error);
          }
          return of(false);
        })
      );
  }

  logout() {
    // TODO: Destroy token
    // return this.http.post<any>(environment.api_url + 'api-token/destroy/', {
    //   'refreshToken': this.getRefreshToken()
    // }).pipe(
    //   tap(() => this.doLogoutUser()),
    //   mapTo(true),
    //   catchError(error => {
    //     alert(error.error);
    //     return of(false);
    //   }));
    this.doLogoutUser();
  }

  register(user: AuthUser): Observable<boolean> {
    return this.http.post<any>(environment.api_url + 'user/register/', user);
  }

  email_reset_password(user: AuthUser): Observable<boolean> {
    return this.http.post<any>(environment.api_url + 'user/email_reset_password/', user);
  }

  reset_password(user: AuthUser, uid: String, token: String): Observable<boolean> {
    return this.http.post<any>(environment.api_url + 'user/reset_password/',
      {'password': user.password, 'uid': uid, 'token': token});
  }

  activate(uid: String, token: String): Observable<any> {
    return this.http.post<any>(environment.api_url + 'user/activate/', {'uid': uid, 'token': token});
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken()  {
    return this.http.post<AuthToken>(environment.api_url + 'api-token/refresh/', {
      'refresh': this.getRefreshToken()
    }).pipe(tap((tokens: AuthToken) => {
      this.storeJwtToken(tokens.access);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private getUserID() {
    const token = this.getJwtToken();
    const token_parts = token.split(/\./);
    const token_decoded = JSON.parse(window.atob(token_parts[1]));
    return token_decoded.user_id;
  }

  getAuthenticatedUser() {
    return this.http.get<AuthUser>(environment.api_url + 'user/' + this.getUserID());
  }

  private doLoginUser(username: string, tokens: AuthToken) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: AuthToken) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

}


// ====================================================================================================================================
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../environments/environment';
// import { Observable, of } from 'rxjs';
// import { catchError, mapTo, tap } from 'rxjs/operators';
// import { AuthUser } from '../models/auth_user.model';
// import { AuthToken } from '../models/auth_token.model';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//
//   private token: AuthToken;
//
//   constructor(private http: HttpClient) {
//     this.token = new AuthToken();
//   }
//
//   login(user: AuthUser): Observable<boolean> {
//     return this.http.post<any>(environment.api_url + 'api-token-auth/', user)
//       .pipe(
//         tap(data => this.doLoginUser(user, data['token'])),
//         mapTo(true),
//         catchError(error => {
//           alert(error.error);
//           return of(false);
//         }));
//   }
//
//   // logout() {
//   //   return this.http.post<any>(environment.api_url + 'logout/', {
//   //     'refreshToken': this.getRefreshToken()
//   //   }).pipe(
//   //     tap(() => this.doLogoutUser()),
//   //     mapTo(true),
//   //     catchError(error => {
//   //       alert(error.error);
//   //       return of(false);
//   //     }));
//   // }
//
//   isLoggedIn() {
//     return this.token.isValid();
//   }
//
//   private doLoginUser(user: AuthUser, token: string) {
//     this.token.doUpdate(user, token);
//   }
//
//   // private doLogoutUser() {
//   //   this.loggedUser = null;
//   //   this.removeTokens();
//   // }
//
//   // private getRefreshToken() {
//   //   return localStorage.getItem(this.REFRESH_TOKEN);
//   // }





  // ==================================================================================================

  // private base_url: String = environment.api_url;
  // private httpOptions: any;
  // public token: string;
  // public token_expires: Date;
  // public username: string;
  // public errors: any = [];
  //
  // constructor(private http: HttpClient) {
  //   this.httpOptions = {
  //     headers: new HttpHeaders({'Content-Type': 'application/json'})
  //   };
  // }
  //
  // public login(user) {
  //   this.http.post(this.base_url + 'api-token-auth/', JSON.stringify(user), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
  //
  // public refreshToken() {
  //   this.http.post(this.base_url + 'api-token-refresh/', JSON.stringify({token: this.token}), this.httpOptions).subscribe(
  //     data => {
  //       this.updateData(data['token']);
  //     },
  //     err => {
  //       this.errors = err['error'];
  //     }
  //   );
  // }
  //
  // public logout() {
  //   this.token = null;
  //   this.token_expires = null;
  //   this.username = null;
  // }
  //
  // private updateData(token) {
  //   this.token = token;
  //   this.errors = [];
  //
  //   // decode the token to read the username and expiration timestamp
  //   const token_parts = this.token.split(/\./);
  //   const token_decoded = JSON.parse(window.atob(token_parts[1]));
  //   this.token_expires = new Date(token_decoded.exp * 1000);
  //   this.username = token_decoded.username;
  // }

  // ==================================================================================================

  // authenticate(auth_user): Observable<any> {
  //   return this.http.post(this.base_url + 'auth/', JSON.stringify(auth_user), this.httpOptions);
  // }

// }
