import { Component, ChangeDetectorRef  } from '@angular/core';
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

    error: string = '';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
      private authService: AuthService,
       private router: Router,
       private cdr: ChangeDetectorRef
      )
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

    submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); 
      return;
    }

    this.authService.login(this.loginForm.value as any).subscribe({
      next: () => {
        this.error = '';
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        console.log(err); 
        if (err.status === 401) {
          this.error = 'Invalid email or password';
        } else {
          this.error = 'Something went wrong. Please try again.';
        }
         this.cdr.detectChanges();
      }
    });
  }
}
