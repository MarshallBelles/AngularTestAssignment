import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ProductsModuleModule { }

export interface Product {
  id: string;
  title: string;
  genre?: string;
  description?: string;
  price: number;
  discount?: string;
  image_url: string;
}
