import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { all } from '../../../core/interface/allcatogries.interface';
import { AllService } from '../../../services/all.service';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    HttpClientModule,
    CardModule,
    ButtonModule,
    RouterLink,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss',
  providers: [AllService],
  encapsulation: ViewEncapsulation.None,
})
export class AllComponent {
  cart: FormGroup = new FormGroup({
    item: new FormControl('', []),
    quantity: new FormControl('1', []),
  });
  allSubscription!: Subscription;
  all: all[] | null = [];
  constructor(
    private allService: AllService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.allService.getAll().subscribe({
      next: (res: HttpResponse<all[]>) => {
        if (res.status === 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.all = res.body;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          console.log(err.statusText);
        }
      },
    });
  }
  addToCart(selectedItem: all) {
    const loggedUsername = localStorage.getItem('loggedUsername');
    if (loggedUsername) {
      const existingCartString = localStorage.getItem('myCart');
      let existingCart = existingCartString
        ? JSON.parse(existingCartString)
        : [];
      const isItemAlreadyAdded = existingCart.some(
        (item: any) => item.id === selectedItem.id
      );

      if (isItemAlreadyAdded) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Item is already added.',
        });
      } else {
        const newIndex = existingCart.length + 1;

        const quantity = this.cart.get('quantity')?.value || 1;

        const newItem = {
          ...selectedItem,
          index: newIndex,
          quantity: quantity,
        };

        existingCart.push(newItem);

        localStorage.setItem('myCart', JSON.stringify(existingCart));
        localStorage.setItem('CartCounter', existingCart.length);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Item added successfully',
        });

        this.cart.get('quantity')?.setValue(1);

        console.log(existingCart);
      }
    }
  }
  ngOnDestroy(): void {
    if (this.allSubscription && this.allSubscription.closed) {
      this.allSubscription.unsubscribe();
    }
  }
}
