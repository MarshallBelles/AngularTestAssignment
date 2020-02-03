import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/services/products-module/products-module.module';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  results: Product[];
  productView: Product;

  constructor(private route: ActivatedRoute, private PS: ProductsService, private CS: CartService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.PS.productView(params['productID']).then((prod) => {
        if (prod) {
          this.results = prod;
          this.productView = this.results[0]; // Get the first result - there should be no duplicates but this is a catch.
        }
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  addToCart(product: Product, amount: number) {
    this.CS.addToCart(product, amount);
  }
}
