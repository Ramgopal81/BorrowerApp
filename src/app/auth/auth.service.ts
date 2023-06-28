import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isloggedin: boolean = false;
  helper: JwtHelperService;
  decodedToken!: any;
  token: string = '';
  constructor(private router: Router) {
    this.helper = new JwtHelperService();
  }

  processingData(data: string) {
    // try {
    ///try block will call when the token is valid
    // we are checking it by decoding using jwt helper service
    // then storing it inside local storage
    //   this.decodedToken = this.helper.decodeToken(data);
    //   this.token = data;

    //   window.localStorage.setItem('token', data);
    //   this.isloggedin = true;
    // } catch (error) {
    //   console.log(error);
    // }

    this.token = data;

    window.sessionStorage.setItem('token', data);
    this.isloggedin = true;
  }

  isUserLoggedin() {
    if (!this.isloggedin) {
      let tokenFromStorage = sessionStorage.getItem('token');

      if (tokenFromStorage !== null && tokenFromStorage !== undefined) {
        this.processingData(tokenFromStorage);
      }
    }
    return this.isloggedin;
  }
  getToken() {
    return this.token;
  }

  signOut(){
    sessionStorage.removeItem('token');
    this.router.navigate(['auth/login']);
    sessionStorage.clear()

  }
}
