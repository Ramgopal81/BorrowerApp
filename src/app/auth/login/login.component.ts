import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { uuid } from 'uuidv4'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
loginForm:FormGroup
formSubmitted: boolean = false;
error!: string;
applicantType:any
  userId: any;
  mobile: any;
  allowedAmount: any;
  currAmount: any;
constructor(private fb: FormBuilder, private router: Router,private apiService:ApiService,private _authService:AuthService){
  this.loginForm = this.fb.group({
    mobile:  [
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
  console.log(this.apiService.encryptionAES('Ram'))
  this.formSubmitted = true;
  if (this.loginForm.valid) {
    const mobile = this.apiService.encryptionAES(this.loginForm.value.mobile);
    const pin = this.apiService.encryptionAES(this.loginForm.value.pin);

    if (mobile && pin) {

      this.apiService.login(mobile,pin).pipe()
      .subscribe({
        next: (response) => {
          if (response) {
         console.log(response);
this.applicantType = response.user.company_code
this.userId = response.user.user_id
this.mobile = response.user.mobile_no
this.allowedAmount = response.company.allowed_amount
this.currAmount = parseInt(response.company.current_amount)
sessionStorage.setItem('companyCode',this.applicantType)
sessionStorage.setItem('userId',this.userId)
sessionStorage.setItem('mobile',this.mobile)
sessionStorage.setItem('allowed',this.allowedAmount)
sessionStorage.setItem('current',this.currAmount)

console.log(this.applicantType);
const token = 'ram578hshjsaghhdcd'
      this._authService.processingData(token);
      if(response.user.is_first_login == 'N'){
        this.router.navigate(["dashboard"]);
      }else if(response.user.is_first_login == 'Y'){
        this.router.navigate(["reset"]);
      }
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

forgetPassword(){
  this.router.navigate(["auth/forget"]);
}
}
