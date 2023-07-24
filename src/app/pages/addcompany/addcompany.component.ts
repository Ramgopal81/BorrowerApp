import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AddCompanyModel } from 'src/app/models/dataModel';

@Component({
  selector: 'app-addcompany',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss']
})
export class AddcompanyComponent {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      comapanyId: ['', [Validators.required]],
      companyCode: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      allowedAmount: ['', [Validators.required]],
    });
  }


  createUser() {
    if (this.loginForm.valid) {
    const addCompanyJSON: AddCompanyModel = {
      
      company_code:this.apiService.encryptionAES(this.loginForm.value.companyCode),
      company_id: null,
      company_name:this.apiService.encryptionAES(this.loginForm.value.companyName),
      company_address:this.apiService.encryptionAES(this.loginForm.value.companyAddress),
      allowed_amount:this.apiService.encryptionAES(this.loginForm.value.allowedAmount)
    };
    this.apiService
      .postAddCompany(addCompanyJSON)
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
    this.router.navigate(['/pages/companyDetail']);
  }
}
