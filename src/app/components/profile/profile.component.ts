import { Component, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';

import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CardModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    PasswordModule,
    CalendarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [provideAnimations()],
})
export class ProfileComponent {
  value!: string;

  disabled: boolean = true;
  profile!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const storedDataString = localStorage.getItem('myData');
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];
    const userId = localStorage.getItem('userId');

    const user = storedData.find((u: any) => u.id === Number(userId));

    if (user) {
      this.profile = this.fb.group({
        username: [
          { value: user.username || '', disabled: this.disabled },
          [Validators.required, Validators.minLength(6)],
        ],
        password: [
          { value: user.password || '', disabled: this.disabled },
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [
          { value: user.confirmPassword || '', disabled: this.disabled },
          [Validators.required, Validators.minLength(6)],
        ],
        email: [
          { value: user.email || '', disabled: this.disabled },
          [Validators.required, Validators.email],
        ],
        firstName: [
          { value: user.firstName || '', disabled: this.disabled },
          [Validators.required, Validators.minLength(6)],
        ],
        lastName: [
          { value: user.lastName || '', disabled: this.disabled },
          [Validators.required, Validators.minLength(6)],
        ],
        mobileNumber: [
          { value: user.mobileNumber || '', disabled: this.disabled },
          [Validators.required, Validators.minLength(6)],
        ],
        birthdate: [
          { value: user.birthdate || '', disabled: this.disabled },
          [Validators.required],
        ],
        gender: [
          { value: user.gender || '', disabled: this.disabled },
          [Validators.required],
        ],
        image: [
          { value: user.image || '', disabled: this.disabled },
          [Validators.required],
        ],
      });
    }
  }
  saveChanges() {
    if (this.profile.valid) {
      this.disabled = true;
      this.profile.disable();
      const storedDataString = localStorage.getItem('myData');
      let storedData = storedDataString ? JSON.parse(storedDataString) : [];
      const userId = localStorage.getItem('userId');
      const userIndex = storedData.findIndex(
        (u: any) => u.id === Number(userId)
      );
      if (userIndex !== -1) {
        storedData[userIndex] = {
          ...storedData[userIndex],
          ...this.profile.value,
        };

        localStorage.setItem('myData', JSON.stringify(storedData));
      }
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data Changed Successfully',
      });
      localStorage.removeItem('isLogged');
      localStorage.removeItem('loggedUsername');
      localStorage.removeItem('userId');
      this.router.navigate(['login']);
    }
  }
  saveImage() {
    const imageControl = this.profile.get('image');
    if (imageControl && imageControl.value) {
      const storedDataString = localStorage.getItem('myData');
      let storedData = storedDataString ? JSON.parse(storedDataString) : [];
      const userId = localStorage.getItem('userId');
      const userIndex = storedData.findIndex(
        (u: any) => u.id === Number(userId)
      );

      if (userIndex !== -1) {
        storedData[userIndex].image = imageControl.value;
        localStorage.setItem('myData', JSON.stringify(storedData));
      }

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Image Saved Successfully',
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No image selected.',
      });
    }
    window.location.reload();
  }

  edit() {
    this.disabled = false;
    this.profile.enable(); // Enable the form controls
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.profile.get('image')?.setValue(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }
}
