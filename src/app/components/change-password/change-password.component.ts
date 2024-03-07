import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { selectUser } from "../../store/user.store"
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  providers: [UserService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  toastr = inject(ToastrService);
  userService = inject(UserService);
  store = inject(Store);
  user = this.store.selectSignal(selectUser);
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmedPassword = false;

  passwordForm = new FormGroup({
    currentPassword: new FormControl("", Validators.required),
    newPassword: new FormControl("", Validators.required),
    confirmedPassword: new FormControl("", Validators.required)
  });

  handleToggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  handleToggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  handleToggleConfirmedPassword() {
    this.showConfirmedPassword = !this.showConfirmedPassword;
  }

  handleSubmit() {
    if (this.passwordForm.valid) {
      this.fetchUpdate();
    } else {
      this.handleInvalidForm();
    }
  }

  fetchUpdate() {
    this.userService.changeUserPassword({
      usernameOrEmail: this.user().user?.username!,
      oldPassword: this.passwordForm.value.currentPassword!,
      newPassword: this.passwordForm.value.newPassword!,
      confirmedPassword: this.passwordForm.value.confirmedPassword!
    }).subscribe(
      data => {
        this.toastr.success("Password changed successfully!");
      },
      errorObject => {
        this.toastr.error(errorObject.error.substring(18, errorObject.error.indexOf("!") + 1));
      }
    );
  }

  handleInvalidForm() {
    if (!this.passwordForm.controls.currentPassword.valid) {
      this.toastr.error("Current password is required!");
    } else if (!this.passwordForm.controls.newPassword.valid) {
      this.toastr.error("New password is required!");
    } else if (!this.passwordForm.controls.confirmedPassword.valid) {
      this.toastr.error("The password needs to be confirmed!");
    }
  }
}
