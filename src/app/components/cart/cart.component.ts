import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputNumberModule,
    FormsModule,
    DialogModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {
  order: FormGroup = new FormGroup({
    history: new FormControl(''),
  });
  myData: any[] = [];
  storedCart: any[] = [];
  cartCounter: number = 0;
  visible: boolean = false;
  loggedUsername!: string;

  ngOnInit(): void {
    const loggeduser = localStorage.getItem('loggedUsername');
    if (loggeduser) {
      this.loggedUsername = loggeduser;
    }
    const myCartCounter = localStorage.getItem('CartCounter');
    const myCart = localStorage.getItem('myCart');
    if (myCartCounter) {
      this.cartCounter = parseInt(myCartCounter, 10);
    }
    if (myCart) {
      this.storedCart = JSON.parse(myCart);
      console.log(this.storedCart);
    }
  }
  delete() {
    localStorage.removeItem('myCart');
    localStorage.removeItem('CartCounter');
    location.reload();
  }
  deleteItem(item: any): void {
    this.cartCounter--;

    const index = this.storedCart.indexOf(item);
    if (index !== -1) {
      this.storedCart.splice(index, 1);

      localStorage.setItem('myCart', JSON.stringify(this.storedCart));
      localStorage.setItem('CartCounter', this.cartCounter.toString());
    }
  }
  orderNow() {
    const myDataKey = localStorage.getItem('myData');
    this.visible = true;

    if (myDataKey) {
      this.myData = JSON.parse(myDataKey);
      console.log('Initial myData:', this.myData);

      const currentUser = this.myData[0];

      if (currentUser) {
        const orderHistory = {
          history: `Order placed Successfully ${
            this.loggedUsername
          } on ${new Date().toLocaleString()} for ${this.calculateTotal()}$`,
        };

        if (!currentUser.history) {
          currentUser.history = [];
        }

        currentUser.history.push(orderHistory);

        this.order.get('history')?.setValue(currentUser.history);

        localStorage.setItem('myData', JSON.stringify(this.myData));
      }
    }
  }

  calculateTotal(): string {
    let total = 0;

    for (const item of this.storedCart) {
      total += item.quantity * item.price;
    }

    // Use toFixed to limit the total to two decimal places
    return total.toFixed(2);
  }
}
