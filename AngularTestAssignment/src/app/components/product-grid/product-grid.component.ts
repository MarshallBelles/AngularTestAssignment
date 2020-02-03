import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ProductsService } from 'src/app/services/products.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/services/products-module/products-module.module';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit, OnDestroy {

  constructor(private PS: ProductsService, private CS: CartService) {
  }

  mobile: boolean;
  products: Product[];
  page: Product[];
  prodSub: Subscription;

  // MatPaginator Inputs
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [20, 40, 80, 120];

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  pageUpdate(pageEvent: PageEvent) {
    const start: number = pageEvent.pageIndex * pageEvent.pageSize;
    const end: number = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    this.page = this.products.slice(start, end);
  }

  ngOnInit() {
    // Here we subscribe to the products observable
    this.prodSub = this.PS.AllProductsObservable.subscribe((dat) => {
      this.products = dat;
      this.length = dat.length;
      this.updateFirstPage();
    });
    this.PS.refresh();
    if (window.innerWidth < 800) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  ngOnDestroy() {
    if (this.prodSub) { this.prodSub.unsubscribe(); }
  }

  updateFirstPage() {
    this.page = this.products.slice(0, 20);
  }

  addToCart(product: Product, amount: number) {
    this.CS.addToCart(product, amount);
  }

  onResize(event) {
    // Since we are watching the window size from the HTML, event.target.innerWidth will be the window width.
    // This could also be done with CSS, but in this instance we want more control.
    if (event.target.innerWidth < 800) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }
}
