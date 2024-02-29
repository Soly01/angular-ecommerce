import { Component, ViewEncapsulation } from '@angular/core';
import { WomenService } from '../../../services/women.service';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Subscription } from 'rxjs';
import { men } from '../../../core/interface/mens-clother.interface';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-women-clothes',
  standalone: true,
  imports: [
    HttpClientModule,
    CardModule,
    ButtonModule,
    RouterLink,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './women-clothes.component.html',
  styleUrl: './women-clothes.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [WomenService],
})
export class WomenClothesComponent {
  cart: FormGroup = new FormGroup({
    item: new FormControl('', []),
    quantity: new FormControl('1', []),
  });
  womenSubscription!: Subscription;
  women: men[] | null = [];
  constructor(
    private womenService: WomenService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getWomen();
  }
  getWomen() {
    this.womenSubscription = this.womenService.getWomen().subscribe({
      next: (res: HttpResponse<men[]>) => {
        if (res.status === 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.women = res.body;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          console.log(err.statusText);
        }
      },
    });
  }
  addToCart(selectedItem: men) {
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
    if (this.womenSubscription && this.womenSubscription.closed) {
      this.womenSubscription.unsubscribe();
    }
  }
}
