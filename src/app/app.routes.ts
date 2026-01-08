import { Routes } from '@angular/router';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { authGuard } from './auth/guards/auth-guard';

export const routes: Routes = [
   {
    path: '',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
   },
     {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    canActivateChild:[authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
            import('./dashboard/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'categories',
        loadComponent: () =>
            import('./categories/category-list/category-list')
            .then(m => m.CategoryList)
      },
      {
          path: 'categories/create',
          loadComponent: () =>
            import('./categories/category-create/category-create')
              .then(m => m.CategoryCreate)
      },
       {
        path: 'categories/edit/:id',
        loadComponent: () =>
          import('./categories/category-create/category-create')
            .then(m => m.CategoryCreate)
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
  },
 

];
