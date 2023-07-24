import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  rows: any;
  totalApplicant:any
  pendingApp: any;
  totalVerify: any;
  todayVerify: any;
  totalReject: any;
  companyCode: any = sessionStorage.getItem('companyCode');
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getApplicationData()
    setTimeout(() => {
      this.router.navigate(['/pages/deleteUser']);
    }, 1000);
  }

  getApplicationData() {
    this.apiService
      .postDashboard(this.apiService.encryptionAES(this.companyCode))
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
            this.rows = response.dashboard_details;
            console.log(this.rows[0].total_applicants);
            this.totalApplicant = this.rows[0].total_applicants;
            this.pendingApp = this.rows[0].pending_for_verification;
            this.todayVerify = this.rows[0].verified_today;
            this.totalVerify = this.rows[0].total_verified;
            this.totalReject = this.rows[0].total_rejected;
            sessionStorage.setItem('totalApplicant', this.totalApplicant);
            sessionStorage.setItem('pendingApp', this.pendingApp);
            sessionStorage.setItem('todayVerify', this.todayVerify);
            sessionStorage.setItem('totalVerify', this.totalVerify);
            sessionStorage.setItem('totalReject', this.totalReject);
            console.log(this.totalApplicant,this.todayVerify,this.pendingApp);
            
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
}
