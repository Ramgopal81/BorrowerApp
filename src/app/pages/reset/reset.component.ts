import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ResetPass } from 'src/app/models/dataModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent {
  resetForm!: FormGroup;
  formSubmitted: boolean = false;
  error!: string;
  userId=sessionStorage.getItem('userId')
  mobile=sessionStorage.getItem('mobile')
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.resetForm = this.fb.group({
      pin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
      newPin: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
      ],
    });
  }

  resetPass() {
    if (this.resetForm.valid) {
      const resetPassJSON: ResetPass = {
        user_id: this.userId,
        mobile_no:this.mobile,
        old_password:this.resetForm.value.pin,
        new_password:this.resetForm.value.newPin
       
      };
      this.apiService
        .postResetPass(resetPassJSON)
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
                  this.router.navigate(['/pages/deleteUser']);
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
  back(){
    this.router.navigate(['/pages/deleteUser']);
  }
}
