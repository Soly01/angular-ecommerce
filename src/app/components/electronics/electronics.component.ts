import { CartService } from './../../../services/cart.service';
import { Subscription } from 'rxjs';
import { electronics } from './../../../core/interface/electronics.interface';
import { Component, ViewEncapsulation } from '@angular/core';
import { ElectronicsService } from '../../../services/electronics.service';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [
    HttpClientModule,
    CardModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [ElectronicsService],
})
export class ElectronicsComponent {
  electronicsSubscription!: Subscription;
  electronics: electronics[] | null = [];
  userId!: string;

  cart: FormGroup = new FormGroup({
    item: new FormControl('', []),
    quantity: new FormControl('1', []),
  });
  constructor(
    private electronicsService: ElectronicsService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getElectronics();
  }
  getElectronics() {
    this.electronicsSubscription = this.electronicsService
      .getElectronics()
      .subscribe({
        next: (res: HttpResponse<electronics[]>) => {
          if (res.status === 200) {
            console.log('get Data Succsess');
          }
          console.log(res);
          this.electronics = res.body;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            console.log(err.statusText);
          }
        },
      });
  }
  addToCart(selectedItem: electronics) {
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
    if (this.electronicsSubscription && this.electronicsSubscription.closed) {
      this.electronicsSubscription.unsubscribe();
    }
  }
}
