import { Component, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ContactService } from '../../../services/contact.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent {
  contact: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
  });
  myData: any[] = [];
  loggedusername!: string;
  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    const loggeduser = localStorage.getItem('loggedUsername');
    if (loggeduser) {
      this.loggedusername = loggeduser;
    }
    const myDataKey = localStorage.getItem('myData');
    if (myDataKey) {
      this.myData = JSON.parse(myDataKey);
      console.log('Initial myData:', this.myData);
    }
    const currentUser = this.myData.find(
      (user) => user.username === this.loggedusername
    );
    if (currentUser) {
      this.contact.patchValue({
        name: currentUser.username || '', // Default to empty string if currentUser.name is undefined
        email: currentUser.email || '',
        text: '',
      });
    }
  }
  onSubmit() {
    const formData = this.contact.value;
    this.contactService.sendMessage(formData).subscribe({
      next: (res) => {
        console.log('success', res);
        this.contact.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message Sent Successfully',
        });
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }
}
