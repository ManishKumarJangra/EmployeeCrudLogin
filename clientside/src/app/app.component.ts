import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

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
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
