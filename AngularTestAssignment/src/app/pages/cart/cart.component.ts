import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/services/products-module/products-module.module';

export interface CartTableInterface {
  count: number;
  title: string;
  price: number;
  productRef: Product;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartSub: Subscription;
  cart: CartTableInterface[];
  items: boolean;

  constructor(private CS: CartService) {
  }

  ngOnInit() {
    this.items = false;
    this.refreshCart();
    this.CS.cartObservable.subscribe((map) => {
      if (!map) { return; }
      this.refreshCart();
    });
  }

  ngOnDestroy() {
    if (this.cartSub) { this.cartSub.unsubscribe(); }
  }

  refreshCart() {
    this.cart = [];
    this.CS.cart.forEach((num, product, map) => {
      this.cart.push({count: num, title: product.title, price: product.price, productRef: product});
    });
    if (this.cart.length > 0) {
      this.items = true;
    }
  }

  updateQuantity(product: Product, amount: number) {
    this.CS.adjustAmount(product, amount);
    this.refreshCart();
  }

  removeItem(product: Product) {
    this.CS.removeFromCart(product);
  }

  clearCart() {
    this.CS.dropCart();
    this.items = false;
  }
}
