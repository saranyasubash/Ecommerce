import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category-model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './category-list.html'
})
export class CategoryList implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef 
  ) {}
  categories: Category[] = [];
  loading = false;
  ngOnInit() {
    this.loadCategories();
  }
loadCategories() {
  this.loading = true;
  this.categoryService.getCategories().subscribe({
    next: (res: any) => {
      console.log('Categories response:', res); 
      this.categories = res.data ?? []; 
      this.loading = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.loading = false;
    }
  });
}

  deleteCategory(id: number) {
    if (!confirm('Delete this category?')) return;

    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
