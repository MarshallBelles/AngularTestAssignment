import { Injectable, OnDestroy } from '@angular/core';
import { Product } from './products-module/products-module.module';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  cart: Map<Product, number>;
  cartSub: Subscription;
  private cartSubject: Subject<Map<Product, number>>;
  public cartObservable: Observable<Map<Product, number>>;

  constructor() {
    this.cart = new Map<Product, number>();
    this.cartSubject = new Subject<Map<Product, number>>();
    this.cartObservable = this.cartSubject.asObservable();
    this.cartSub = this.cartObservable.subscribe((crt) => {
      if (crt) { this.cart = crt; }
    });
  }

  addToCart(product: Product, count: number) {
    // Ensure count is > 0
    if (count <= 0) { return; }
    // Check to see if one already exists
    let exists = false;
    this.cart.forEach((num, prod, map) => {
      if (product.id === prod.id) {
        // exists, update amount
        exists = true;
        let amt = +num;
        amt += +count;
        this.cart.set(product, amt);
      }
    });
    if (!exists) {
      // add to cart
      this.cart.set(product, count);
    }
    this.cartSubject.next(this.cart);
  }

  removeFromCart(product: Product) {
    // remove product
    this.cart.delete(product);
    this.cartSubject.next(this.cart);
  }

  adjustAmount(product: Product, count: number) {
    // adjust amount to count
    if (count <= 0) { return; }
    this.cart.forEach((num, prod, map) => {
      if (product === prod) {
        // exists, update amount
        this.cart.set(product, count);
      }
    });
    this.cartSubject.next(this.cart);
  }

  dropCart() {
    this.cart.clear();
    this.cartSubject.next(this.cart);
  }

  ngOnDestroy() {
    if (this.cartSub) { this.cartSub.unsubscribe(); }
  }

  count() {
      let totalCount = 0;
      this.cart.forEach((num, product, map) => {
        totalCount += +num;
      });
      return totalCount;
  }
}
