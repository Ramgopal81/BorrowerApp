import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { ModifyUserModel, UserDetail } from 'src/app/models/dataModel';

@Component({
  selector: 'app-modify-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.scss'],
})
export class ModifyUserComponent {
  loginForm!: FormGroup;
  userId=sessionStorage.getItem('userId')
  formSubmitted: boolean = false;
  error!: string;
  company:any = [];
  userType = [
    { id: 'A', name: 'Admin' },
    { id: 'N', name: 'User' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
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
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/),
        ],
      ],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      company: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUserData()
    this.getcompanyData()
  }

  modifyUser() {
    if (this.loginForm.valid) {
    const modifyUserJSON: ModifyUserModel = {
      user_id: this.apiService.encryptionAES(this.userId),
      firstname: this.apiService.encryptionAES(this.loginForm.value.firstName),
      lastname:this.apiService.encryptionAES(this.loginForm.value.lastName),
      role:this.apiService.encryptionAES(this.loginForm.value.role),
      companyName:'',
      email_id:this.apiService.encryptionAES(this.loginForm.value.email),
      password:this.apiService.encryptionAES(this.loginForm.value.pin),
      mobile_no:this.apiService.encryptionAES(this.loginForm.value.mobile),
      company_code:this.apiService.encryptionAES(this.loginForm.value.company),
      admin:false,
      bc_agent:false,
      otp:''
    };
    this.apiService
      .postModifyUser(modifyUserJSON)
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
                this.router.navigate(['/pages/users']);
              }
            }
          });
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
    console.log(this.loginForm);
  }

  
    getUserData(){
      const detailJSON:UserDetail = {
        user_id:this.userId
      }
      this.apiService
      .postUserDetail(detailJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
           console.log(response);
           this.loginForm.controls['email'].setValue(response.user.email_id);
           this.loginForm.controls['firstName'].setValue(response.user.firstname);
           this.loginForm.controls['lastName'].setValue(response.user.lastname);
           this.loginForm.controls['mobile'].setValue(response.user.mobile_no);
           this.loginForm.controls['company'].setValue(response.user.companyName);
           this.loginForm.controls['role'].setValue(response.user.role);
           this.loginForm.controls['pin'].setValue(response.user.password);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
    back(){
      this.router.navigate(['/pages/users']);
    }

    getcompanyData(){
      this.apiService
      .postcompanyDetails()
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
            this.company= response.company;
            console.log(this.company);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
    }
  }

