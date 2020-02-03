import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/services/products-module/products-module.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

  mobileView: boolean;
  cartCount: number;
  cartSub: Subscription;

  constructor(private CS: CartService) {
    // get count until observable returns next value
    // this helps us stay on track after nav events.
    this.cartCount = CS.count();
  }

  ngOnInit() {
    if (window.innerWidth < 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
    this.cartSub = this.CS.cartObservable.subscribe((cart) => {
      if (!cart) { return; }
      let totalCount = 0;
      cart.forEach((num: number, product: Product, map: Map<Product, number>) => {
        totalCount += +num;
      });
      this.cartCount = totalCount;
    });
  }

  ngOnDestroy() {
    if (this.cartSub) { this.cartSub.unsubscribe(); }
  }

  onResize(event) {
    // Since we are watching the window size from the HTML, event.target.innerWidth will be the window width.
    // This could also be done with CSS, but in this instance we want more control.
    if (event.target.innerWidth < 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }
}
