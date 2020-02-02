import { Component, OnInit, Input } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ProductsService } from 'src/app/services/products.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/services/products-module/products-module.module';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {

  @Input('search')
  search: boolean;

  constructor(private PS: ProductsService) {
  }

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
    console.log(pageEvent);
    let start: number = pageEvent.pageIndex * pageEvent.pageSize;
    let end: number = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    this.page = this.products.slice(start, end);
  }

  ngOnInit() {
    if (this.search) {
      this.prodSub = this.PS.SearchResultsObservable.subscribe((dat) => {
        this.products = dat;
        this.length = dat.length;
        this.updateFirstPage();
      });
    } else {
      this.prodSub = this.PS.AllProductsObservable.subscribe((dat) => {
        this.products = dat;
        this.length = dat.length;
        this.updateFirstPage();
      });
    }
    this.PS.init();
  }

  updateFirstPage() {
    this.page = this.products.slice(0, 20);
  }
}
