import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { UserService } from '../../services/user.service';
import { ISigninUserDto } from '../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService]
})
export class LoginComponent {
  userService = inject(UserService);
  toastr = inject(ToastrService);
  router = inject(Router);
  showPassword = false;

  signinDto: ISigninUserDto = {
    usernameOrEmail: "",
    password: ""
  };

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  handleSignIn() {
    this.userService.signinUser(this.signinDto).subscribe(
      data => {
        // todo...
        //userStore.setState(true, data);
        localStorage.setItem("loggedin", "true");
        this.toastr.success(`Welcome ${data.firstName} ${data.lastName}`);
        this.router.navigate(["/"]);
      }, 
      errorObject => {
        this.toastr.error(errorObject.error.substring(18, errorObject.error.indexOf("!") + 1));
      }
    );
  }
}
