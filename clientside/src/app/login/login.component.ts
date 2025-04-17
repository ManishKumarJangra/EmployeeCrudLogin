import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../login';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: Login = new Login();

  constructor(private loginservice: LoginService, private router: Router,
    private toastr: ToastrService) {}

  loginClick() {
    this.loginservice.CheckUser(this.user).subscribe(
      (response) => {
        alert("Login Successful")
        this.router.navigateByUrl('/employee');
      },
      (error) => {
        Swal.fire('Error!', 'Wrong Username or Password', 'error');
                  this.toastr.error('Wrong username or password!', 'Error', {
                    progressBar: true,
                  });
        this.user.username = '';
        this.user.password = '';
      }
    );
  }
}
