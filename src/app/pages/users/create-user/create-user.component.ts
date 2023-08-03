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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
      }).then((result) => {
        if (result.isConfirmed) {
    const addUserJSON: AddUserModel = {
      user_id:'',
      company_code:this.apiService.encryptionAES(this.loginForm.value.company),
      firstname: this.apiService.encryptionAES(this.loginForm.value.firstName),
      lastname:this.apiService.encryptionAES(this.loginForm.value.lastName),
      role:this.apiService.encryptionAES(this.loginForm.value.role),
      companyName:'',
      email_id:this.apiService.encryptionAES(this.loginForm.value.email),
      password:'',
      mobile_no:this.apiService.encryptionAES(this.loginForm.value.mobile),
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
         
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
      Swal.fire('Saved', 'Your detail has been saved.', 'success');
    }
  });
  }
    console.log(this.loginForm);
  }
  back(){
    this.router.navigate(['/pages/users']);
  }
}
