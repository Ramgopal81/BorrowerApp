import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { uuid } from 'uuidv4';
import { MetaModel } from 'src/app/models/dataModel';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  formSubmitted: boolean = false;
  error!: string;
  check:boolean= false
  applicantType: any;
  userId: any;
  mobile: any;
  allowedAmount: any;
  currAmount: any;
  viewUrl: string = '';
  companyName:any
  userName:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private _authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      pin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });
  }

  onLogin() {
    console.log(this.apiService.decryptionAES('U2FsdGVkX1+EORT4LVTB6ZgBh0adA263mKKylSPVRbE='));
    
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      const mobile = this.apiService.encryptionAES(this.loginForm.value.mobile);
      const pin = this.apiService.encryptionAES(this.loginForm.value.pin);

      if (mobile && pin) {
        this.apiService
          .login(mobile, pin)
          .pipe()
          .subscribe({
            next: (response) => {
              if (response) {
                console.log(response);
                this.applicantType = this.apiService.decryptionAES(
                  response.user.company_code
                );
                this.companyName = this.apiService.decryptionAES(
                  response.user.companyName
                );
                this.userId = response.user.user_id;
                this.mobile = response.user.mobile_no;
                this.allowedAmount = this.apiService.decryptionAES(
                  response.company.allowed_amount
                );
                this.currAmount = parseInt(
                  this.apiService.decryptionAES(response.company.current_amount)
                );
                this.userName = this.apiService.decryptionAES(response.user.firstname)
                sessionStorage.setItem('companyCode', this.applicantType);
                sessionStorage.setItem('userId', this.userId);
                sessionStorage.setItem('mobile', this.mobile);
                sessionStorage.setItem('allowed', this.allowedAmount);
                sessionStorage.setItem('current', this.currAmount);
                sessionStorage.setItem('companyName', this.companyName);
                sessionStorage.setItem('userName', this.userName);
                console.log(this.applicantType);
                const token =
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o';
                this._authService.processingData(token);
                if (response.user.is_first_login == null) {
                  this.router.navigate(['dashboard']);
                } else if (response.user.is_first_login == 'Y') {
                  this.router.navigate(['reset']);
                }
                console.log(this.apiService.decryptionAES("U2FsdGVkX1925MUPTyBnNFztwRUeTKFJ+VESg0JX/xk="
                ));
                
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {},
          });
      }
    } else {
    }
  }

  

  fs(){
    console.log(this.check);
    
    // this.check = true
  }

  forgetPassword() {
    this.router.navigate(['auth/forget']);

    let url =
      'http://truckersapp.eastus.cloudapp.azure.com:9080/metaWebApp/index.html?data=U2FsdGVkX1/ipWFy6uP5P/+5Nys97W9dZX8yvo+l8W4pkb5GU7CodZOv7BoQyBc9B4HnEXOseGUxeA+X7Og+4J5QwJJ/j/ObaYn340oOLw0i8x3n4f3V1aBV+HjtGBU7m/1Ww5nJPwktQ41mjOujXAmoS5M8cS+GPr6pCpNmLX7mcC9OhrOvyOkM6Vjv/Oflut4oQ6Lh7lm010hZZ/bNAA==';
    // `'http://truckersapp.eastus.cloudapp.azure.com:9080/metaWebApp/index.html?data='
    //   'name='+
    //   'ekta' +
    //   '&clanguage=' +
    //   'english' +
    //   '&accnum=' +
    //   '250' +
    //   '&loanamout=' +
    //   '5000' +
    //   '&pendingamount=' +
    //   '1000' +
    //   '&EMIamount=' +
    //   '1000' +
    //   '&duedate=' +
    //   '05/12/2356' +
    //   '&pemi=' +
    //   '1'`;
    console.log(url);
  }

  hi() {
    // let x =
    //   'name=राम&clanguage=hindi&accnum=2367&loanamout=250000&pendingamount=30000&EMIamount=3000&duedate=30&pemi=10';
    // console.log(x);

    // let y = this.apiService.encryptionAES(x);
    // console.log(y);
    // console.log(this.apiService.decryptionAES(y));
    // console.log(
    //   'http://truckersapp.eastus.cloudapp.azure.com:9080/metaWebApp/index.html?data=' +
    //     'y'
    // );
    // console.log(
    //   this.apiService.decryptionAES(
    //     'U2FsdGVkX1/iZsycRqshYctW2j5Sos2v9QYzUeBh3CIbvDIT2+IT0fxm3RTNEwCO4EbAKLdOJUNLJtJjEx8eYj7n3F4D4nT+jGvZmFUtyjZZu6Jmi3ZNTwSrVkcTOUTT51rxNijKlABE2l1u/vC+qfPDwVqSg6ISXKxnU9A9fwPDAeUcMM5c2HdGvcFlEk1O'
    //   )
    // );

    // this.viewUrl = `http://truckersapp.eastus.cloudapp.azure.com:9080/metaWebApp/index.html?data=${y}`;
    // 'http://truckersapp.eastus.cloudapp.azure.com:9080/metaWebApp/index.html?data='+y;

    const addCompanyJSON: MetaModel = {
      name:'ekta',
      clanguage:'english',
      accnum:'123',
      loanamout:'5000',
      pendingamount:'2000',
      EMIamount:'1000',
      duedate:'05',
      pemi:'2'
    };
    window.open('http://4.236.144.236:9567/meta'+addCompanyJSON, '_blank');
    this.apiService
    .postOpenUrl(addCompanyJSON)
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          
          
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
    // console.log(this.viewUrl);
    // window.open(this.viewUrl, '_blank');

    // const url =
    //   'http://truckersapp.eastus.cloudapp.azure.com:9080/metaWebApp/index.html?data=U2FsdGVkX1/B5IRiZsCuk1xBB0MhjjGH88M50noH73qjIiCHRx51APOAiLmQagkjs/iNx+drReQA/Gfd44nu0s8aCyfKv/Cvrb2y8d971TIcqdSCqDKy8Wxftm7ia5Zd/QYUkXVkg8KWFcb/+UR4au8RJ6T0kiC5zW1Tgi8De9s4GJf+TG/UTGGx//L8Q7mL';

    // const parts = url.split('data=');
    // if (parts.length === 2) {
    //   const extractedString = parts[1];
    //   console.log(extractedString);
    // } else {
    //   console.log('The URL does not contain the "data=" parameter.');
    // }

    // const params = new URLSearchParams(new URL(url).search);
    // const dataValue = params.get('data');
    // console.log(dataValue);
  }
}
