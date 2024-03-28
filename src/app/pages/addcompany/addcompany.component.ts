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
      companyCode: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),Validators.maxLength(20)]],
      companyName: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),Validators.maxLength(20)]],
      companyAddress: ['', [Validators.required,Validators.maxLength(100)]],
      allowedAmount: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      contactPerson: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),Validators.maxLength(20)]],
      contactMobile: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      contactdesignation: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),Validators.maxLength(20)]],
      contactEmail: ['', [Validators.required,Validators.pattern(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/)]],
    });
  }


  createUser() {
    if (this.loginForm.valid) {
    const addCompanyJSON: AddCompanyModel = {
      
      company_code:this.apiService.encryptionAES(this.loginForm.value.companyCode),
      company_id: this.apiService.encryptionAES('AF'),
      company_name:this.apiService.encryptionAES(this.loginForm.value.companyName),
      company_address:this.apiService.encryptionAES(this.loginForm.value.companyAddress),
      allowed_amount:this.apiService.encryptionAES(this.loginForm.value.allowedAmount),
      contact_person1: this.apiService.encryptionAES(this.loginForm.value.contactPerson),
      contact_person_mobile1:this.apiService.encryptionAES(this.loginForm.value.contactMobile),
      contact_person_designation1:this.apiService.encryptionAES(this.loginForm.value.contactdesignation),
      contact_person_email1:this.apiService.encryptionAES(this.loginForm.value.contactEmail)
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
            title: this.apiService.decryptionAES(response.message)
          }).then((response) => {
            if (response.isConfirmed) {
              if (response) {
                setTimeout(() => {
                  this.router.navigate(['/pages/companyDetail']);
                }, 2000);
              }
            }
          });
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
      
  }   else {
    Swal.fire('', '“Please Provide Correct Data”', 'error');
  }
    console.log(this.loginForm);
  }
  back(){
    this.router.navigate(['/pages/companyDetail']);
  }
  clear(){
    this.loginForm.reset()
  }
}
