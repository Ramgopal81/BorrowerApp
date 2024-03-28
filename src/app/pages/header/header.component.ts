import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showFiller = false;
  companyName: any = sessionStorage.getItem('companyName');
  userName: any = sessionStorage.getItem('userName');
  constructor(private router: Router,private authService:AuthService) {}
  editProfile() {
    this.router.navigate(['pages/reset']);
  }
  logOut() {
  this.authService.signOut()
  }
}
