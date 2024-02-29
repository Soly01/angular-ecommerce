import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent {
  loggedusername!: string;
  showHomeContent = true;
  showSettingsContent = false;
  showapperanceContent = false;
  showhistoryContent = false;
  myData: any[] = [];
  userHistory: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    const loggeduser = localStorage.getItem('loggedUsername');
    if (loggeduser) {
      this.loggedusername = loggeduser;
    }
    const myDataKey = localStorage.getItem('myData');
    if (myDataKey) {
      this.myData = JSON.parse(myDataKey);
      console.log('Initial myData:', this.myData);

      const currentUser = this.myData.find(
        (user) => user.username === this.loggedusername
      );
      if (currentUser && currentUser.history) {
        this.userHistory = currentUser.history;
        console.log('User History:', this.userHistory);

        if (this.userHistory.length === 0) {
          console.log('No history available.');
        }
      }
    }
  }
  showContent(section: string) {
    this.showHomeContent = false;
    if (section === 'home') {
      this.showHomeContent = true;
      this.showSettingsContent = false;
      this.showapperanceContent = false;
      this.showhistoryContent = false;
    } else if (section === 'settings') {
      this.showHomeContent = false;
      this.showapperanceContent = false;
      this.showSettingsContent = true;
      this.showhistoryContent = false;
    } else if (section === 'apperance') {
      this.showHomeContent = false;
      this.showapperanceContent = true;
      this.showSettingsContent = false;
      this.showhistoryContent = false;
    } else if (section === 'history') {
      this.showHomeContent = false;
      this.showapperanceContent = false;
      this.showSettingsContent = false;
      this.showhistoryContent = true;
    }
  }
  changeTheme(theme: string) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  delete() {
    const myDataKey = localStorage.getItem('myData');

    if (myDataKey) {
      const myData = JSON.parse(myDataKey);
      const userIndex = myData.findIndex(
        (user: { username: string }) => user.username === this.loggedusername
      );

      if (userIndex !== -1) {
        myData.splice(userIndex, 1);

        localStorage.setItem('myData', JSON.stringify(myData));

        localStorage.removeItem('loggedUsername');
        localStorage.removeItem('CartCounter');
        localStorage.removeItem('myCart');
        localStorage.removeItem('isLogged');
        localStorage.removeItem('userId');
        localStorage.removeItem('theme');
        this.router.navigate(['/login']);
      }
    }
  }
  deleteHistory() {
    const currentUser = this.myData.find(
      (user) => user.username === this.loggedusername
    );

    if (currentUser) {
      currentUser.history = [];

      localStorage.setItem('myData', JSON.stringify(this.myData));

      this.userHistory = [];
    }
  }
}
