import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule,  } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './login.html'
})
export class Login {

  error = '';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,  private authService: AuthService, private router: Router)
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => this.error = err.error?.message || 'Login failed'
    });
  }
}
