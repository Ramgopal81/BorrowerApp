import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent {
  
  constructor(private router: Router) {}

  home(){
    this.router.navigate(['pages/home'])
  }
  trigger(){
    this.router.navigate(['pages/triggerDetail'])
  }
}
