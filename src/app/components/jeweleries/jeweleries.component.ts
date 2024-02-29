import { JeweleriesService } from './../../../services/jeweleries.service';
import { Subscription } from 'rxjs';
import { jeweleries } from './../../../core/interface/jeweleries.interface';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  HttpClientModule,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-jeweleries',
  standalone: true,
  imports: [
    HttpClientModule,
    CardModule,
    ButtonModule,
    RouterLink,
    InputNumberModule,
    ReactiveFormsModule,
  ],
  templateUrl: './jeweleries.component.html',
  styleUrl: './jeweleries.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [JeweleriesService],
})
export class JeweleriesComponent {
  cart: FormGroup = new FormGroup({
    item: new FormControl('', []),
    quantity: new FormControl(1, [Validators.min(1)]), // Set a default value of 1 and a minimum value of 1
  });
  jeweleriesSubscription!: Subscription;
  jeweleries: jeweleries[] | null = [];
  constructor(
    private JeweleriesService: JeweleriesService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getJeweleries();
  }
  getJeweleries() {
    this.jeweleriesSubscription =
      this.JeweleriesService.getJeweleries().subscribe({
        next: (res: HttpResponse<jeweleries[]>) => {
          if (res.status == 200) {
            console.log('get Data Success');
          }
          console.log(res);
          this.jeweleries = res.body;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 404) {
            console.log(err.statusText);
          }
        },
      });
  }
  addToCart(selectedItem: jeweleries) {
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
    if (this.jeweleriesSubscription && this.jeweleriesSubscription.closed) {
      this.jeweleriesSubscription.unsubscribe();
    }
  }
}
