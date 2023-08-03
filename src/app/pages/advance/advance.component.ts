import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AdvanceTrigger } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-advance',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
  ],
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss'],
})
export class AdvanceComponent {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;
  status1: any = [];
  closeResult: string = '';
  statusOption1 = [{ id: 'O', name: 'Problem not resolved' }];
  userId: any;
  applicantsData: any;
  applicantId: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.loginForm = this.fb.group({
      authoriserId: ['', [Validators.required]],
      applicantId: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      truckNo: ['', [Validators.required]],
      fromLocation: ['', [Validators.required]],
      toLocation: ['', [Validators.required]],
      advanceAmount: ['', [Validators.required]],
      returnDate: ['', [Validators.required]],
      accountNo: ['', [Validators.required]],
      ifscCode: ['', [Validators.required]],
      approvedAmount: ['', [Validators.required]],
      mkComment: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.getApplicationData();
  }
  submit() {
    if (this.loginForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
      }).then((result) => {
        if (result.isConfirmed) {
          const addAdvanceJSON: AdvanceTrigger = {
            applicant_id: this.apiService.encryptionAES(
              this.loginForm.value.applicantId
            ),
            from_location: this.apiService.encryptionAES(
              this.loginForm.value.fromLocation
            ),
            to_location: this.apiService.encryptionAES(
              this.loginForm.value.toLocation
            ),
            start_date_journey: this.apiService.encryptionAES(
              this.loginForm.value.fromDate
            ),
            end_date_journey_expected: this.apiService.encryptionAES(
              this.loginForm.value.toDate
            ),
            advance_amount: this.apiService.encryptionAES(
              this.loginForm.value.advanceAmount
            ),
            return_date_amount_expected: this.apiService.encryptionAES(
              this.loginForm.value.returnDate
            ),
            truck_number: this.apiService.encryptionAES(
              this.loginForm.value.truckNo
            ),
            raised_user_id: this.apiService.encryptionAES(
              this.loginForm.value.authoriserId
            ),
            approved_user_id: this.apiService.encryptionAES('null'),
            account_no: this.apiService.encryptionAES(
              this.loginForm.value.accountNo
            ),
            ifsc_code: this.apiService.encryptionAES(
              this.loginForm.value.ifscCode
            ),
            approved_amount: this.apiService.encryptionAES(
              this.loginForm.value.approvedAmount
            ),
            comment_by_mk: this.apiService.encryptionAES(
              this.loginForm.value.mkComment
            ),
            commenyt_by_sh: this.apiService.encryptionAES('null'),
            approval_status: this.apiService.encryptionAES('S'),
          };
          this.apiService
            .postAdvanceDetail(addAdvanceJSON)
            .pipe()
            .subscribe({
              next: (response) => {
                if (this.apiService.decryptionAES(response.status) == 'True') {
                  this.loginForm.reset();
                }
              },
              error: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          Swal.fire('Saved', 'Your detail has been saved.', 'success');
        }
      });
    }
  }

  openVerticallyCentered(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getId() {
    this.applicantId = this.userId;
    console.log(this.applicantId);
  }
  cancel() {}
  show() {
    this.router.navigate(['/pages/home']);
  }

  getApplicationData() {
    this.apiService
      .postDetails('AV')
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
            this.applicantsData = response.applicant;
            if (response.applicant) {
              response.applicant.forEach((element: any) => {
                if (element.applicant_id) {
                  element.applicant_id = this.apiService.decryptionAES(
                    element.applicant_id
                  );
                }
                if (element.applicant_firstname) {
                  element.applicant_firstname = this.apiService.decryptionAES(
                    element.applicant_firstname
                  );
                }
                if (element.applicant_lastname) {
                  element.applicant_lastname = this.apiService.decryptionAES(
                    element.applicant_lastname
                  );
                }
                if (element.applicant_email_id) {
                  element.applicant_email_id = this.apiService.decryptionAES(
                    element.applicant_email_id
                  );
                }
                if (element.company_name) {
                  element.company_name = this.apiService.decryptionAES(
                    element.company_name
                  );
                }
                if (element.applicant_mobile_no) {
                  element.applicant_mobile_no = this.apiService.decryptionAES(
                    element.applicant_mobile_no
                  );
                }
                if (element.av_approval) {
                  element.av_approval = this.apiService.decryptionAES(
                    element.av_approval
                  );
                }
                if (element.mk_approval) {
                  element.mk_approval = this.apiService.decryptionAES(
                    element.mk_approval
                  );
                }
                if (element.sh_approval) {
                  element.sh_approval = this.apiService.decryptionAES(
                    element.sh_approval
                  );
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
}
