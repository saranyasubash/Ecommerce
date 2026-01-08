import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category-model';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './category-create.html'
})
export class CategoryCreate implements OnInit {

  isEdit = false;
  categoryId!: number;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {  this.form = this.fb.group({
      name: ['', Validators.required]
    });}

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.isEdit = true;
      this.loadCategory();
    }
  }

 loadCategory() {
  this.categoryService.getCategoryById(this.categoryId).subscribe({
    next: (res: any) => {   
    this.form.patchValue({
      name:res.data.name
    });
  }
  });
  
}

  submit() {
    const payload: Partial<Category> = {
     name: this.form.value.name! 
    };

    if (this.form.invalid) return;

    if (this.isEdit) {
      this.categoryService.updateCategory(
        this.categoryId,
        payload
      ).subscribe(() => {
        this.router.navigate(['/admin/categories']);
      });
    } else {
      this.categoryService.createCategory(payload).subscribe(() => {
        this.router.navigate(['/admin/categories']);
      });
    }
  }
}
