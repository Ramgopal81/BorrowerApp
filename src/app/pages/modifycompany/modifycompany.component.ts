import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AddCompanyModel } from 'src/app/models/dataModel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifycompany',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './modifycompany.component.html',
  styleUrls: ['./modifycompany.component.scss']
})
export class ModifycompanyComponent {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;
  companyId: any = sessionStorage.getItem('companyCode');
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      comapanyId: ['', [Validators.required,Validators.maxLength(20)]],
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

  ngOnInit():void{
this.modifyCompany()
}
  createUser() {
    if (this.loginForm.valid) {
    const addCompanyJSON: AddCompanyModel = {
      
      company_code:this.apiService.encryptionAES(this.loginForm.value.companyCode),
      company_id: this.apiService.encryptionAES(this.loginForm.value.comapanyId),
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
                // this.router.navigate(['/pages/user']);
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
      
    } else {
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

  modifyCompany(){
    this.apiService
    .postcompanyName(this.apiService.encryptionAES(this.companyId))
    .pipe()
    .subscribe({
      next: (response) => {
        // if (response.company) {
        //   response.company.forEach((element: any) => {
        //     if (element.company_id) {
        //       element.company_id = this.apiService.decryptionAES(
        //         element.company_id
        //       );
        //     }
        //     if (element.company_code) {
        //       element.company_code = this.apiService.decryptionAES(
        //         element.company_code
        //       );
        //     }
        //     if (element.compnay_address) {
        //       element.compnay_address =
        //         this.apiService.decryptionAES(
        //           element.compnay_address
        //         );
        //     }
        //     if (element.company_name) {
        //       element.company_name =
        //         this.apiService.decryptionAES(
        //           element.company_name
        //         );
        //     }
        //     if (element.allowed_amount) {
        //       element.allowed_amount =
        //         this.apiService.decryptionAES(
        //           element.allowed_amount
        //         );
        //     }
        //     if (element.current_amount) {
        //       element.current_amount = this.apiService.decryptionAES(
        //         element.current_amount
        //       );
        //     }
        //   });
        // }
        
        this.loginForm.controls['comapanyId'].setValue(this.apiService.decryptionAES(response.company.company_id));
        this.loginForm.controls['companyCode'].setValue(this.apiService.decryptionAES(response.company.company_code));
        this.loginForm.controls['companyName'].setValue(this.apiService.decryptionAES(response.company.company_name));
        this.loginForm.controls['companyAddress'].setValue(this.apiService.decryptionAES(response.company.compnay_address));
        this.loginForm.controls['allowedAmount'].setValue(this.apiService.decryptionAES(response.company.allowed_amount));
        this.loginForm.controls['contactPerson'].setValue(this.apiService.decryptionAES(response.company.contact_person1));
        this.loginForm.controls['contactMobile'].setValue(this.apiService.decryptionAES(response.company.contact_person_mobile1));
        this.loginForm.controls['contactdesignation'].setValue(this.apiService.decryptionAES(response.company.contact_person_designation1));
        this.loginForm.controls['contactEmail'].setValue(this.apiService.decryptionAES(response.company.contact_person_email1));
        
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  
}
}
