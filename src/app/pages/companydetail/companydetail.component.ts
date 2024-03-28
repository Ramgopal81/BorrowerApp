import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companydetail',
  standalone: true,
  imports: [CommonModule,NgxDatatableModule,FormsModule],
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.scss']
})
export class CompanydetailComponent {
  company: any;
companyId:any
  companyCode: any;


  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.getcompanyData()
console.log(this.getcompanyData);
  }
  getcompanyData(){
    this.apiService
    .postcompanyDetails()
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          // this.companyCode = response.company.company_id
          this.company= response.company;
          if (response.company) {
            response.company.forEach((element: any) => {
              if (element.company_name) {
                element.company_name = this.apiService.decryptionAES(element.company_name);
              }
              if (element.company_code) {
                element.company_code = this.apiService.decryptionAES(element.company_code);
              }
              if (element.company_id) {
                element.company_id = this.apiService.decryptionAES(element.company_id);
              }
              if (element.allowed_amount) {
                element.allowed_amount = this.apiService.decryptionAES(element.allowed_amount);
              }
              if (element.current_amount) {
                element.current_amount = this.apiService.decryptionAES(element.current_amount);
              }
            });
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  addCompany(){
this.router.navigate(['addCompany'])
  }

  modifyCompany(){
    sessionStorage.setItem('companyCode',this.companyId)
    this.router.navigate(['modifyCompany'])
  }

  
  deleteCompany(){
    this.apiService
    .postDeleteCompany(this.apiService.encryptionAES(this.companyId))
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
        console.log(response);
        Swal.fire({
          position: 'center',
          icon: response.status ? 'success' : 'error',
          title: this.apiService.decryptionAES(response.message)
        }).then((response) => {
          if (response.isConfirmed) {
            if (response) {
              // this.router.navigate(['/pages/user']);
              this.getcompanyData()
            }
          }
        });
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  
}
  viewBorrowerDetail(id: any) {
    this.router.navigate(['pages/modifyUser'], {
      queryParams: { id: id },
    });
  }
}
