import { Injectable, OnInit } from '@angular/core';
import { Product } from './products-module/products-module.module';
import rawData from '../../assets/MOCK_DATA.json'; // if this shows as an error, ignore it - shouldn't be used in production anyways.

// This service would normally reach out to web resources using the http(s) module
// In a secured, internal application, it could also connect to the database directly
// Since this is for demonstration, it will provide static data.

// // This is called 'stubbing' a service

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  localDB: Product[];

  constructor() {
    this.localDB = rawData;
  }

  create(product: Product) {
    // Adds a new product to the database
    // If there is aleady an existing product matching the productID, it will be overwritten
    if (product) {
      let apos: number;
      let fref: Product = null;
      this.localDB.forEach((element, i, tempArr) => {
        if (element.id === product.id) {
          // found match
          fref = element;
          apos = i;
        }
      });
      if (fref) {
        // updating existing product
        this.localDB[apos] = product;
      } else {
        // creating new product
        this.localDB.push(product);
      }
    } else {
      return;
    }
  }
  read(productID?: string) {
    // return specific product details
    // this is used in the product's page
    // // if no productID is provided, return all
    if (!productID) {
      return this.localDB;
    } else {
      const retProd: Product[] = new Array();
      this.localDB.forEach(prod => {
        if (prod.id === productID) {
          retProd.push(prod);
          return retProd;
        }
      });
      return retProd; // if no matching product, return nothing.
    }
  }
  update(product: Product) {
    // Updates a product in the database where product.productID = productID
    // An update query will perform an insert if there is no match
    // ^ stubbing this endpoint to act just like pgSQL
    if (product) {
      let apos: number;
      let fref: Product = null;
      this.localDB.forEach((element, i, tempArr) => {
        if (element.id === product.id) {
          // found match
          fref = element;
          apos = i;
        }
      });
      if (fref) {
        // updating existing product
        this.localDB[apos] = product;
      } else {
        // creating new product
        this.localDB.push(product);
      }
    } else {
      return;
    }
  }
  delete(product: Product) {
    // Deletes a product where product.productID = productID;
    this.localDB.filter(item => item !== product);
  }
  search(SearchTerm: string) {
    // loop through all products and return matching products
    const localArr: Product[] = new Array();
    this.localDB.forEach(element => {
      if (element.title.toLowerCase().includes(SearchTerm.toLowerCase())) {
        // This title matches
        localArr.push(element);
      } else if (element.description.toLowerCase().includes(SearchTerm.toLowerCase())) {
        // The description matches
        localArr.push(element);
      }
    });
    return localArr;
  }
}
