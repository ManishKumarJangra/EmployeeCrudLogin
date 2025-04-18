import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;
    this.loginService.CheckUser(loginData).subscribe({
      next: (res) => {
        console.log('Login Successful', res);
        Swal.fire('Success!', 'Login successful', 'success');
        this.toastr.success('Successful login!', 'success', {
          progressBar: true,
        });
        this.router.navigateByUrl('/employee');
      },
      error: (err) => {
        console.error('Login failed', err);
        Swal.fire('Login failed!', 'Invalid Login Credentials', 'error');
      },
    });
  }
}
