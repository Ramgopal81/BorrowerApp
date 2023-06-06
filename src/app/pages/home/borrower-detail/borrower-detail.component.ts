import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthorisationFormModel, Authorize } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrower-detail',
  standalone: true,
  imports: [CommonModule],
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
applicantPhoto:any
applicantAadhar:any
applicantPan:any
  applicantType: any = sessionStorage.getItem('companyCode');
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBorrowerDetail();
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
                
                  if (
                  (response.applicant[0].authorisation_status == '0' &&
                    this.applicantType == 'AV') ||
                  (response.applicant[0].authorisation_status == '1' &&
                    this.applicantType == 'MK') ||
                  (response.applicant[0].authorisation_status == '2' &&
                    this.applicantType == 'SH')
                ) {
                  this.validateButton = true;
                } else {
                  this.validateButton = false;
                }

                if (response.document) {
                  response.document.forEach((element: any) => {
                    if (element.docName=="Applicant Signature") {
                      this.signatureApplicant =
                      'data:image/png;base64,' +
                      element.data;
                    }
                    if (element.docName=="Applicant Photo") {
                      this.applicantPhoto =
                      'data:image/png;base64,' +
                      element.data;
                    }
                    if (element.docName=="Aadhar Card") {
                      this.applicantAadhar =
                      'data:image/png;base64,' +
                      element.data;
                    }
                    if (element.docName=="PAN Card") {
                      this.applicantPan =
                      'data:image/png;base64,' +
                      element.data;
                    }
                  })
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

  // checkUserType(authorisation_status: any) {
  //   if (authorisation_status == '0' && this.applicantType == 'AV') {
  //     this.authorisedButtonText = 'Approve';
  //   }
  //  else if (authorisation_status == '1' && this.applicantType == 'MK') {
  //     this.authorisedButtonText = ' Approve';
  //   }
  //  else if (authorisation_status == '2' && this.applicantType == 'SH') {
  //     this.authorisedButtonText = 'Approve';
  //   }
  // }

  authorise(authorisedButtonText: string) {
    let dynamicCompanyCode: string = '';
    if (this.applicantType == 'AV') {
      dynamicCompanyCode = 'AV';
    } else if (this.applicantType == 'MK') {
      dynamicCompanyCode = 'MK';
    } else if (this.applicantType == 'SH') {
      dynamicCompanyCode = 'SH';
    }
    const authoriseJSON: AuthorisationFormModel = {
      applicant_id: this.currCheckedId,
      approval_status: 'Y',
      company_code: dynamicCompanyCode,
    };
    this.apiService
      .postauthorize(authoriseJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          Swal.fire({
            position: 'center',
            icon: response.status ? 'success' : 'error',
            title: response.message
          }).then((response) => {
            if (response.isConfirmed) {
              if (response) {
                this.router.navigate(['/pages/home']);
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
      applicant_id: this.currCheckedId,
      approval_status: 'N',
      company_code: dynamicCompanyCode,
    };
    this.apiService
      .postauthorize(authoriseJSON)
      .pipe()
      .subscribe({
        next: (response) => {
          Swal.fire({
            position: 'center',
            icon: response.status ? 'success' : 'error',
            title: response.message
          }).then((response) => {
            if (response.isConfirmed) {
              if (response) {
                this.router.navigate(['/pages/home']);
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
  back() {
    this.router.navigate(['pages/home']);
  }
}
