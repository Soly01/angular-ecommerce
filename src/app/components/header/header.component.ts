import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { SidebarService } from '../../../services/sidebar.service';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, AvatarModule, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  user: any;
  counterValue!: string | null;

  constructor(private router: Router, public SidebarService: SidebarService) {}
  ngOnInit() {
    const counterValueString = localStorage.getItem('CartCounter');
    this.counterValue = counterValueString !== null ? counterValueString : '0';

    const isLogged = localStorage.getItem('isLogged');
    if (isLogged) {
      const loggedUsername = localStorage.getItem('loggedUsername');

      if (loggedUsername) {
        const myData = JSON.parse(localStorage.getItem('myData') || '[]');
        this.user = myData.find((u: any) => u.username === loggedUsername);
      }
    }
  }

  logOut() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('loggedUsername');
    localStorage.removeItem('userId');
    localStorage.removeItem('myCart');
    localStorage.removeItem('CartCounter');
    this.router.navigate(['login']);
  }
  cart() {
    this.router.navigate(['/cart']);
  }
  profile() {
    this.router.navigate(['/profile']);
  }
  sideBarOpen() {
    this.SidebarService.sideBarOpen();
  }
}
