import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './products-module/products-module.module';
import { DataServiceService } from './data-service.service';

// // The main purpose of the products service is to provide an easier way for components to view product data.

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Subscribe to these observables in other components
  private AllProductsSubject: Subject<Product[]>;
  private SearchResultsSubject: Subject<Product[]>;
  public AllProductsObservable: Observable<Product[]>;
  public SearchResultsObservable: Observable<Product[]>;

  constructor(private DS: DataServiceService) {
    // Setup our observables as Subjects
    // This allows us to both subscribe to the value changes and 'set' values
    this.AllProductsSubject = new Subject<Product[]>();
    this.SearchResultsSubject = new Subject<Product[]>();
    // Only the observables are exposed publically for access
    // This is to prevent improper usage of this service
    this.AllProductsObservable = this.AllProductsSubject.asObservable();
    this.SearchResultsObservable = this.SearchResultsSubject.asObservable();
  }

  public init() {
    // We will call this from a component when using the service.
    this.AllProductsSubject.next(this.DS.read()); // gets all products from the DB
  }

  public async ProductSearch(SearchTerm: string) {
    // Perform Search operation and set SearchResultsSubect equal to.
    // This will be called upon each separate search.
    this.SearchResultsSubject.next(this.DS.search(SearchTerm));
  }
}
