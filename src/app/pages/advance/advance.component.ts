import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AdvanceTrigger } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss'],
})
export class AdvanceComponent {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
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
    console.log(this.apiService.decryptionAES(
      'U2FsdGVkX199pUwzaOzhZcrDnhc7dpLugx6iizI5li8='
    ));
  }
  submit() {
    if (this.loginForm.valid) {
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
        ifsc_code: this.apiService.encryptionAES(this.loginForm.value.ifscCode),
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
            Swal.fire({
              position: 'center',
              icon: response.status ? 'success' : 'error',
              title: this.apiService.decryptionAES(response.message),
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
  }



show(){
  this.router.navigate(['/pages/home'])
}
}
