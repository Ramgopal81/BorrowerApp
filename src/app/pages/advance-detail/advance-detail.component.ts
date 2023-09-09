import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdvanceSaveModel } from 'src/app/models/dataModel';

@Component({
  selector: 'app-advance-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './advance-detail.component.html',
  styleUrls: ['./advance-detail.component.scss'],
})
export class AdvanceDetailComponent implements OnInit {
  applicantsData: any;
  borrowerDetail: any;
  currCheckedId: any;
  companyName: any;
  approvedAmount: any;
  approvedUserId: any;
  applicantType: any = sessionStorage.getItem('companyCode');
  userId: any = sessionStorage.getItem('mobile');
  // ammount: any = sessionStorage.getItem('current');
  msg: boolean = false;
  user: any;
  status: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBorrowerDetail();
    console.log(this.applicantType);
    if (this.applicantType == 'SH' && this.status == 'S'){
      this.msg = true;
      console.log(this.msg);
      
    }
    this.user = this.apiService.decryptionAES(this.userId);


  }

  getBorrowerDetail() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.apiService
          .getadvanceById(this.apiService.encryptionAES(params['id']))
          .pipe()
          .subscribe({
            next: (response) => {
              if (response) {
                console.log(response);
                this.currCheckedId = response.list[0].applicant_id;
                this.borrowerDetail = response.list[0];

                // this.approvedAmountCheck = parseInt(
                //   response.applicant[0].loanAmount
                // );
                // this.companyName = response.applicant[0].company_name;
                if (response.list) {
                  response.list.forEach((element: any) => {
                    if (element.applicant_id) {
                      element.applicant_id = this.apiService.decryptionAES(
                        element.applicant_id
                      );
                    }
                    if (element.from_location) {
                      element.from_location = this.apiService.decryptionAES(
                        element.from_location
                      );
                    }
                    if (element.to_location) {
                      element.to_location = this.apiService.decryptionAES(
                        element.to_location
                      );
                    }
                    if (element.start_date_journey) {
                      element.start_date_journey =
                        this.apiService.decryptionAES(
                          element.start_date_journey
                        );
                    }
                    if (element.end_date_journey_expected) {
                      element.end_date_journey_expected =
                        this.apiService.decryptionAES(
                          element.end_date_journey_expected
                        );
                    }
                    if (element.advance_amount) {
                      element.advance_amount = this.apiService.decryptionAES(
                        element.advance_amount
                      );
                    }
                    if (element.return_date_amount_expected) {
                      element.return_date_amount_expected =
                        this.apiService.decryptionAES(
                          element.return_date_amount_expected
                        );
                    }
                    if (element.truck_number) {
                      element.truck_number = this.apiService.decryptionAES(
                        element.truck_number
                      );
                    }
                    if (element.raised_user_id) {
                      element.raised_user_id = this.apiService.decryptionAES(
                        element.raised_user_id
                      );
                    }
                    if (element.approved_user_id) {
                      element.approved_user_id = this.apiService.decryptionAES(
                        element.approved_user_id
                      );
                    }
                    if (element.account_no) {
                      element.account_no = this.apiService.decryptionAES(
                        element.account_no
                      );
                    }
                    if (element.ifsc_code) {
                      element.ifsc_code = this.apiService.decryptionAES(
                        element.ifsc_code
                      );
                    }
                    if (element.approved_amount) {
                      element.approved_amount = this.apiService.decryptionAES(
                        element.approved_amount
                      );
                    }
                    if (element.comment_by_mk) {
                      element.comment_by_mk = this.apiService.decryptionAES(
                        element.comment_by_mk
                      );
                    }
                    if (element.commenyt_by_sh) {
                      element.commenyt_by_sh = this.apiService.decryptionAES(
                        element.commenyt_by_sh
                      );
                    }
                    if (element.approval_status) {
                      element.approval_status = this.apiService.decryptionAES(
                        element.approval_status
                      );
                    }
                  });
                  this.approvedAmount = response.list[0].approved_amount;
                  this.status = response.list[0].approval_status;
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

  saveAdvanceDetail() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to approve this loan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const addAdvanceJSON: AdvanceSaveModel = {
          applicant_id: this.currCheckedId,
          company_code: this.apiService.encryptionAES(this.applicantType),
          approval_status: this.apiService.encryptionAES('Y'),
          approved_amount: this.apiService.encryptionAES(this.approvedAmount),
          approved_username: this.apiService.encryptionAES(this.approvedUserId),
          comment_by_sh: this.apiService.encryptionAES('Ok'),
        };
        this.apiService
          .postSaveAdvance(addAdvanceJSON)
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

  reject() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to reject this loan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const addAdvanceJSON: AdvanceSaveModel = {
          applicant_id: this.currCheckedId,
          company_code: this.apiService.encryptionAES(this.applicantType),
          approval_status: this.apiService.encryptionAES('N'),
          approved_amount: this.apiService.encryptionAES(this.approvedAmount),
          approved_username: this.apiService.encryptionAES(this.approvedUserId),
          comment_by_sh: this.apiService.encryptionAES('Ok'),
        };
        this.apiService
          .postSaveAdvance(addAdvanceJSON)
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
    this.router.navigate(['pages/triggerDetail']);
  }
}
