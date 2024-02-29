import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenService } from '../../../services/men.service';
import { Subscription } from 'rxjs';
import { men } from '../../../core/interface/mens-clother.interface';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mens-clothes',
  standalone: true,
  imports: [
    HttpClientModule,
    CardModule,
    ButtonModule,
    RouterLink,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './mens-clothes.component.html',
  styleUrl: './mens-clothes.component.scss',
  providers: [MenService],
  encapsulation: ViewEncapsulation.None,
})
export class MensClothesComponent {
  cart: FormGroup = new FormGroup({
    item: new FormControl('', []),
    quantity: new FormControl('1', []),
  });
  mensSubscribtion!: Subscription;
  men: men[] | null = [];
  constructor(
    private menService: MenService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getMen();
  }
  getMen() {
    this.mensSubscribtion = this.menService.getMen().subscribe({
      next: (res: HttpResponse<men[]>) => {
        if (res.status === 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.men = res.body;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 404) {
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
    if (this.mensSubscribtion && this.mensSubscribtion.closed) {
      this.mensSubscribtion.unsubscribe();
    }
  }
}
