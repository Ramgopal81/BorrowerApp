import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,NgxDatatableModule],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;
  company = [
    { id: 'AV', name: 'Arthavedka' },
    { id: 'MK', name: 'MakesPay' },
    { id: 'SH', name: 'Share India' },
  ];
  rows: any
  
  userId:any
  loadingIndicator = true;
  ColumnMode = ColumnMode;
  
  
  reorderable = true;
  userDetail:boolean=false
  columns = [
    { name: 'User Id', prop: 'user_id', },
    { name: 'User Name', prop: 'username', },
    { name: 'First Name', prop: 'firstname' },
    { name: 'Last Name', prop: 'last_Name' },
    { name: 'Email', prop: 'email_ID',width:250},
    { name: 'Employee Code', prop: 'emp_Code'},
    { name: 'Department', prop: 'department'},
    { name: 'Location', prop: 'location'},
    { name: 'Mobile', prop: 'mobile'},
    { name: 'Group ID', prop: 'user_group_id'},
    { name: 'Manager Name', prop: 'manager_Name'},
    
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
   
    private apiService: ApiService
  ) {
    // this.loginForm.disable;
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required]],
      pin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });
  }
  ngOnInit(): void {
    this.getApplicationData()
  }

  deleteUser(){
this.userDetail=true
  }
  getApplicationData(){
    this.apiService
    .postuserDetails()
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          this.rows=  response.users;
       
       
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

}


