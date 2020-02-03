import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  input: any;
  searchBar: any;
  searching: boolean;

  constructor(private PS: ProductsService) { }

  ngOnInit() {
    this.searching = false;
  }

  searchProducts(searchTerm: string) {
    this.PS.ProductSearch(searchTerm);
    this.searching = true;
  }

  clearSearch() {
    this.PS.refresh();
    this.searching = false;
    this.input = '';
  }

}
