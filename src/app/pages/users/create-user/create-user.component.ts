import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AddUserModel } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  loginForm!: FormGroup;
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
    this.getcompanyData()
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
  
  createUser() {
    if (this.loginForm.valid) {
    const addUserJSON: AddUserModel = {
      user_id:'',
      company_code:this.loginForm.value.company,
      firstname: this.loginForm.value.firstName,
      lastname:this.loginForm.value.lastName,
      role:this.loginForm.value.role,
      companyName:'',
      email_id:this.loginForm.value.email,
      password:'',
      mobile_no:this.loginForm.value.mobile,
      otp:'',
      admin:false,
      bc_agent:false
    };
    this.apiService
      .postAddUser(addUserJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          if(response.status == true){
            this.loginForm.reset();
          }
          Swal.fire({
            position: 'center',
            icon: response.status ? 'success' : 'error',
            title: response.message
          }).then((response) => {
            if (response.isConfirmed) {
              if (response) {
                this.router.navigate(['/pages/user']);
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
  back(){
    this.router.navigate(['/pages/users']);
  }
}
