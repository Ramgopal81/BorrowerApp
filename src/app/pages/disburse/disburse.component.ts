import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DisburseModel } from '../../models/dataModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-disburse',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './disburse.component.html',
  styleUrls: ['./disburse.component.scss']
})
export class DisburseComponent {
  approvedAmount: any;
  date:any
  remark:any
  loanId:any
  transactionId:any
  company: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.getLoanId()
  }
  getLoanId(){
    this.apiService
    .postAllLoanId()
    .pipe()
    .subscribe({
      next: (response) => {
        if (response) {
          // this.company= response.loanId;
          // if (response.loanId) {
          //   response.loanId.forEach((element: any) => {
          //     if (element) {
          //       element = this.apiService.decryptionAES(
          //         element
          //       );
          //     }
              
          //   });
          // }
          // console.log(this.company);
          response.loanId.forEach((element:any, index:number) => {
            response.loanId[index] = this.apiService.decryptionAES(element);
          });
          this.company= response.loanId;
          console.log(this.loanId);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  saveAdvanceDetail() {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Save this Detail!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Save it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const disburseJSON: DisburseModel = {
          amount: this.apiService.encryptionAES(this.approvedAmount.toString()),
          remarks: this.apiService.encryptionAES(this.remark),
          date_of_disbursemnet: this.apiService.encryptionAES(this.date),
          loan_id: this.apiService.encryptionAES(this.loanId),
          transaction_id: this.apiService.encryptionAES(this.transactionId.toString()),
         disbursement_account_no:this.apiService.encryptionAES('34216354498'),
         disbursement_ifsc:this.apiService.encryptionAES('SBIN0004837')
        };
        this.apiService
          .postDisburseDetail(disburseJSON)
          .pipe()
          .subscribe({
            next: (response) => {
              if (this.apiService.decryptionAES(response.status) == 'false') {
                Swal.fire(
                  'unsaved',
                  this.apiService.decryptionAES(response.message),
                  'error'
                );
              } else {
                Swal.fire(
                  'Saved',
                  this.apiService.decryptionAES(response.message),
                  'success'
                );
                this.router.navigate(['pages/deleteUser']);
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => {},
          });
      }
    });
  }

  back() {
    this.router.navigate(['pages/deleteUser']);
  }
}
