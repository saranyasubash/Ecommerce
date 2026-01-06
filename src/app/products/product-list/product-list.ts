import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
 products = [
    { name: 'Laptop', price: 80000 },
    { name: 'Phone', price: 40000 },
  ];
}