import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
})
export class AppComponent {
  title = 'e-commerce';
  showHead: boolean = false;

  constructor(private router: Router) {
    const theme = localStorage.getItem('theme');
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    }
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/login' || event['url'] === '/register') {
          this.showHead = false;
        } else if (event['url'].includes('/complete-register')) {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
