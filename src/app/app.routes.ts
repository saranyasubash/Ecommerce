import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';

export const routes: Routes = [
     {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: 'categories',
        loadComponent: () =>
            import('./categories/category-list/category-list')
            .then(m => m.CategoryList)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/product-list/product-list')
            .then(m => m.ProductList)
      },
      {
        path: 'stock',
        loadComponent: () =>
          import('./stock/stock/stock')
            .then(m => m.Stock)
      }
    ]
  }
];
