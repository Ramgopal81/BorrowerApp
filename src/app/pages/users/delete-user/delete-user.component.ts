import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ColumnMode, NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,
    CanvasJSAngularChartsModule,
  ],
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent {
  rows: any;
  totalApplicant:any = sessionStorage.getItem('totalApplicant');
  companyCode: any = sessionStorage.getItem('companyCode');
  count: any = sessionStorage.getItem('current');
  pendingApp: any= sessionStorage.getItem('pendingApp')
  totalVerify: any=sessionStorage.getItem('totalVerify');
  todayVerify: any=sessionStorage.getItem('todayVerify');
  totalReject: any=sessionStorage.getItem('totalReject');
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.getApplicationData();
  }
  chartOptions = {
    animationEnabled: true,
    title: {
      text: 'Applicants Status',
    },
    data: [
      {
        type: 'pie',
        yValueFormatString: "#,###.##''",
        indexLabel: '{name}: {y}',
        dataPoints: [
          { y: this.totalApplicant, name: 'Total Applicants' },
          { y: this.pendingApp, name: 'Pending for Verification' },
          { y: this.todayVerify, name: 'Verified Today' },
          { y: this.todayVerify, name: 'Total Verified' },
          { y: this.totalReject, name: 'Total Rejected' },
        ],
      },
    ],
  };
  getApplicationData() {
    this.apiService
      .postDashboard(this.apiService.encryptionAES(this.companyCode))
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
            this.rows = response.dashboard_details;
            if (response.dashboard_details) {
              response.dashboard_details.forEach((element: any) => {
                if (element.total_applicants) {
                  element.total_applicants = this.apiService.decryptionAES(element.total_applicants);
                }
                if (element.pending_for_verification) {
                  element.pending_for_verification = this.apiService.decryptionAES(element.pending_for_verification);
                }
                if (element.verified_today) {
                  element.verified_today = this.apiService.decryptionAES(element.verified_today);
                }
                if (element.total_verified) {
                  element.total_verified = this.apiService.decryptionAES(element.total_verified);
                }
                if (element.total_rejected) {
                  element.total_rejected = this.apiService.decryptionAES(element.total_rejected);
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
