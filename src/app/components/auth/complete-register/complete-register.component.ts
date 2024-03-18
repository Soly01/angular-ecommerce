import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-complete-register',
  standalone: true,
  imports: [
    CardModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CalendarModule,
    RadioButtonModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './complete-register.component.html',
  styleUrl: './complete-register.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class CompleteRegisterComponent {
  value: string | undefined;
  userId!: string;
  completeRegister: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      onlyNumbersValidator,
    ]),
    birthdate: new FormControl('', [Validators.required, validDateValidator()]),
    gender: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  registerSet() {
    if (this.completeRegister.valid) {
      const existingData = JSON.parse(localStorage.getItem('myData') || '[]');

      const user = existingData.find(
        (user: { id: number }) => user.id === +this.userId
      );

      if (user) {
        Object.assign(user, this.completeRegister.value);

        localStorage.setItem('myData', JSON.stringify(existingData));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You Have Registered Successfully',
        });
      } else {
        this.messageService.add({
          severity: 'danger',
          summary: 'error',
          detail: 'User Not Found',
        });
      }
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.completeRegister.get('image')?.setValue(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }
}
function onlyNumbersValidator(
  control: FormControl
): { [s: string]: boolean } | null {
  if (!/^\d+$/.test(control.value)) {
    return { onlyNumbers: true }; // Returning an object representing the error
  }
  return null; // Returning null when the validation passes
}
function validDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = !isNaN(Date.parse(control.value));
    return valid ? null : { invalidDate: true };
  };
}
