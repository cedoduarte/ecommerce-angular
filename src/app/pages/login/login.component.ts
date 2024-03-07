import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { UserService } from '../../services/user.service';
import { ISigninUserDto } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  userService = inject(UserService);
  toastr = inject(ToastrService);
  router = inject(Router);
  store = inject(Store);
  showPassword = false;

  signinDto: ISigninUserDto = {
    usernameOrEmail: "",
    password: ""
  };

  ngOnInit() {
    this.store.dispatch(setUser({
      user: JSON.parse(localStorage.getItem("user") as string),
      loggedin: JSON.parse(localStorage.getItem("loggedin") as string)
    }));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleEnterKeyPressed(event: any) {
    this.handleSignIn();
  }

  handleSignIn() {
    this.userService.signinUser(this.signinDto).subscribe(
      data => {
        this.store.dispatch(setUser({
          user: data,
          loggedin: true
        }));
        this.toastr.success(`Welcome ${data.firstName} ${data.lastName}`);
        this.router.navigate(["/poster"]);
      }, 
      errorObject => {
        this.toastr.error(errorObject.error.substring(18, errorObject.error.indexOf("!") + 1));
      }
    );
  }
}
