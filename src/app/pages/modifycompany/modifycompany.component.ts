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
      comapanyId: ['', [Validators.required]],
      companyCode: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyAddress: ['', [Validators.required]],
      allowedAmount: ['', [Validators.required]],
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
                // this.router.navigate(['/pages/user']);
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

  modifyCompany(){
    this.apiService
    .postcompanyName(this.companyId)
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
        console.log(response);
        this.loginForm.controls['comapanyId'].setValue(response.company.company_id);
        this.loginForm.controls['companyCode'].setValue(response.company.company_code);
        this.loginForm.controls['companyName'].setValue(response.company.companyName);
        this.loginForm.controls['companyAddress'].setValue(response.company.company_address);
        this.loginForm.controls['allowedAmount'].setValue(response.company.allowed_amount);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  
}
}
