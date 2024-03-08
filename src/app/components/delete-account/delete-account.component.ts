import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.store';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  providers: [UserService],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {
  toastr = inject(ToastrService);
  userService = inject(UserService);
  router = inject(Router);
  store = inject(Store);
  showCurrentPassword = false;
  showConfirmedPassword = false;

  accountForm = new FormGroup({
    username: new FormControl("", Validators.required),
    currentPassword: new FormControl("", Validators.required),
    confirmedPassword: new FormControl("", Validators.required)
  });

  handleToggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  handleToggleConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  handleSubmit() {
    this.userService.deleteAccount({
      usernameOrEmail: this.accountForm.value.username!,
      currentPassword: this.accountForm.value.currentPassword!,
      confirmedPassword: this.accountForm.value.confirmedPassword!
    }).subscribe(
      data => {
        this.toastr.success("Your account has beed deleted successfully!");
        this.store.dispatch(setUser({
          user: null,
          loggedin: false
        }));
        this.router.navigate(["/login"]);
      },
      errorObject => {
        this.toastr.error(errorObject.error.substring(18, errorObject.error.indexOf("!") + 1));
      }
    );
  }
}
