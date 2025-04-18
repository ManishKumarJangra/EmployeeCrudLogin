import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'empCRUDfrontend';
  constructor(private router: Router, public loginService: LoginService) {}
  logoutClick() {
    this.loginService.currentUser = '';
    localStorage.clear();
    Swal.fire('Logout!', 'User logged out', 'error');
    this.router.navigateByUrl('/login');
  }
}
