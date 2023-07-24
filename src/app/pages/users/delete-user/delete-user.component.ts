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
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
