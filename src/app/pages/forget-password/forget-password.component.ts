import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';
import { ForgetPass } from 'src/app/models/dataModel';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  resetForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;
  userId=sessionStorage.getItem('userId')
  mobile=sessionStorage.getItem('mobile')
  msg:boolean=false
  resendButton:boolean=false
  otpButton:boolean=true
  mpinFeild:boolean=false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.resetForm = this.fb.group({
      pin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      otp: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      mobile:  [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }


  resetPass(){
    const forgetPassJSON: ForgetPass = {
      mobile_no:this.resetForm.value.mobile,
      otp:null,
      new_password:null
     
    };
    this.apiService
      .postForgetPass(forgetPassJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          if(response.status==true){
            this.otpButton =false
            this.resendButton =true
          }
        setTimeout(() => {
          response.status == true?this.msg =true:false
        }, 1000);
        //  response.status == true?this.msg ==true:false
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
        
      });
      
  }


  onLogin(){
    this.router.navigate(['/auth/login'])
  }
  otpCheck(){
    const forgetPassJSON: ForgetPass = {
      mobile_no:this.resetForm.value.mobile,
      otp:this.resetForm.value.otp,
      new_password:null
     
    };
    this.apiService
      .postForgetPass(forgetPassJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          if(response.status==true){
           this.resendButton =false
           this.mpinFeild= true
          }
        // setTimeout(() => {
        //   response.status == true?this.msg =true:false
        // }, 1000);
        //  response.status == true?this.msg ==true:false
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
        
      });
  }

  createMpin(){
    const forgetPassJSON: ForgetPass = {
      mobile_no:this.resetForm.value.mobile,
      otp:this.resetForm.value.otp,
      new_password:this.resetForm.value.pin
     
    };
    this.apiService
      .postForgetPass(forgetPassJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          Swal.fire({
            position: 'center',
            icon: response.status ? 'success' : 'error',
            title: response.message
          }).then((response) => {
            if (response.isConfirmed) {
              if (response) {
                this.router.navigate(['/auth/login']);
              }
            }
          });
          // if(response.status==true){
          //  this.resendButton =false
          
          // }
        // setTimeout(() => {
        //   response.status == true?this.msg =true:false
        // }, 1000);
        //  response.status == true?this.msg ==true:false
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
        
      });
  }
}
