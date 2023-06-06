import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

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
constructor(private fb: FormBuilder, private router: Router,private apiService:ApiService,private _authService:AuthService){
  this.loginForm = this.fb.group({
    mobile: [
      "",
      [
        Validators.required,
        
      ],
    ],
    pin: ["", [Validators.required
      // ,Validators.minLength(3),
      // Validators.maxLength(4),
    ]],
  });
}


onLogin() {
  this.formSubmitted = true;
  if (this.loginForm.valid) {
    const mobile = this.loginForm.get("mobile")?.value;
    const pin = this.loginForm.get("pin")?.value;

    if (mobile && pin) {

      this.apiService.login(mobile,pin).pipe()
      .subscribe({
        next: (response) => {
          if (response) {
         console.log(response);
this.applicantType = response.user.company_code
sessionStorage.setItem('companyCode',this.applicantType)
console.log(this.applicantType);

      // this._authService.processingData(response.token);
      this.router.navigate(["home"]);

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
}
