import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthorisationFormModel, Authorize } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-borrower-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './borrower-detail.component.html',
  styleUrls: ['./borrower-detail.component.scss'],
})
export class BorrowerDetailComponent implements OnInit {
  borrowerDetail: any;
  authorize: Authorize = new Authorize();
  currCheckedId: any;
  authorisedButtonText: string = '';
  validateButton: boolean = false;
  signatureApplicant: any;
  buttonName: any;
  applicantPhoto: any;
  applicantAadhar: any;
  applicantPan: any;
  approvedAmountCheck: any;
  companyName: any;
  buttonName1:any
  applicantId:any
  applicantType: any = sessionStorage.getItem('companyCode');
  allowedAmount: any = sessionStorage.getItem('allowed');
  currentAmount: any = sessionStorage.getItem('current');
  approvedBy:any = sessionStorage.getItem('mobile');
  updtButton:boolean=false
  comment:string =''
  elegibleAmount:number=0
  elegible:boolean = false
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBorrowerDetail();
    console.log(this.apiService.decryptionAES(this.applicantType));
    if (
      (this.applicantType) == 'AV'
    ) {
      this.updtButton = true;
     
    }
  }

  getBorrowerDetail() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.apiService
          .getapplicantById(params['id'])
          .pipe()
          .subscribe({
            next: (response) => {
              if (response) {
                console.log(response);
                this.currCheckedId = response.applicant[0].applicant_id;
                this.borrowerDetail = response.applicant[0];
                
                this.approvedAmountCheck = parseInt(
                  response.applicant[0].loanAmount
                );
                this.companyName = response.applicant[0].company_code;
                console.log(typeof this.approvedAmountCheck);
                console.log(typeof this.currentAmount);

                if (
                  response.applicant[0].authorisation_status == '0' &&
                  (this.applicantType) == 'AV'
                ) {
                  this.validateButton = true;
                  this.buttonName = 'Verify Applicant'
                  this.buttonName1 = 'Reject Applicant'
                } else if (
                  response.applicant[0].authorisation_status == '1' &&
                  (this.applicantType) == 'MK'
                ) {
                  this.validateButton = true;
                  this.buttonName = 'Authorise Applicant'
                  this.buttonName1 = 'Reject Applicant'
                } else if (
                  response.applicant[0].authorisation_status == '2' &&
                  (this.applicantType) == 'SH'
                ) {
                  this.validateButton = true;
                  this.elegible = true
                  this.buttonName = 'Approve Loan'
                  this.buttonName1 = 'Reject Loan'
                } else{
                  this.validateButton = false;
                }

                if (response.document) {
                  response.document.forEach((element: any) => {
                    if (element.docName == 'Applicant Signature') {
                      this.signatureApplicant =
                        'data:image/png;base64,' + element.data;
                    }
                    if (element.docName == 'Applicant Photo') {
                      this.applicantPhoto =
                        'data:image/png;base64,' + element.data;
                    }
                    if (element.document == 'POA') {
                      this.applicantAadhar =
                        'data:image/png;base64,' + element.data;
                    }
                    if (element.document == 'POI') {
                      this.applicantPan =
                        'data:image/png;base64,' + element.data;
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
    });
  }



  authorise(authorisedButtonText: string) {
    if(this.comment != ''){
    let num = parseInt(this.currentAmount);
    console.log(typeof num);
    console.log(typeof  this.currCheckedId.toString());
    if (num - 5000 >= 0) {
      let dynamicCompanyCode: string = '';
      if (this.applicantType == 'AV') {
        dynamicCompanyCode = 'AV';
      } else if (this.applicantType == 'MK') {
        dynamicCompanyCode = 'MK';
      } else if (this.applicantType == 'SH') {
        dynamicCompanyCode = 'SH';
      }
      const authoriseJSON: AuthorisationFormModel = {
        applicant_id: this.apiService.encryptionAES(this.currCheckedId.toString()),
        approval_status: this.apiService.encryptionAES('Y'),
        company_code: this.apiService.encryptionAES(dynamicCompanyCode),
        loan_amount: this.apiService.encryptionAES(this.approvedAmountCheck.toString()),
        applicant_company_code: this.apiService.encryptionAES(this.companyName),
        comment:this.apiService.encryptionAES(this.comment),
        approval_by:this.apiService.encryptionAES('8700134652'),
        eligible_loan_amount:this.apiService.encryptionAES(this.elegibleAmount.toString())
      };
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.buttonName,
      }).then((result) => {
        if (result.isConfirmed) {+
      this.apiService
        .postauthorize(authoriseJSON)
        .pipe()
        .subscribe({
          next: (response) => {
            if(this.apiService.decryptionAES(response.status) == 'false'){
              Swal.fire(this.apiService.decryptionAES(response.message));
            }else{
              Swal.fire( this.apiService.decryptionAES(response.message));
              setTimeout(() => {
                this.router.navigate(['/pages/home']);
              }, 2000);
            
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        });
      }
      });
    } else {
      Swal.fire('Insufficient Fund');
    }
  }else{
    Swal.fire('Comment are mandatory')
  }
  }

  notAuthorise(authorisedButtonText: string) {
    let dynamicCompanyCode: string = '';
    if (this.applicantType == 'AV') {
      dynamicCompanyCode = 'AV';
    } else if (this.applicantType == 'MK') {
      dynamicCompanyCode = 'MK';
    } else if (this.applicantType == 'SH') {
      dynamicCompanyCode = 'SH';
    }
    const authoriseJSON: AuthorisationFormModel = {
      applicant_id: this.apiService.encryptionAES(this.currCheckedId.toString()),
      approval_status: this.apiService.encryptionAES('N'),
      company_code: this.apiService.encryptionAES(dynamicCompanyCode),
      loan_amount: this.apiService.encryptionAES(this.approvedAmountCheck.toString()),
      applicant_company_code: this.apiService.encryptionAES(this.companyName),
      comment:this.apiService.encryptionAES('hi'),
      approval_by:this.apiService.encryptionAES('8700134652'),
      eligible_loan_amount:this.apiService.encryptionAES('0')
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.buttonName1,
    }).then((result) => {
      if (result.isConfirmed) {+
    this.apiService
      .postauthorize(authoriseJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          if(this.apiService.decryptionAES(response.status) == 'false'){
            Swal.fire(this.apiService.decryptionAES(response.message));
          }else{
            Swal.fire( this.apiService.decryptionAES(response.message));
          
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
    this.router.navigate(['pages/home']);
  }
  update() {
    sessionStorage.setItem('applicantId',this.currCheckedId)
    this.router.navigate(['pages/update']);
  }
}
