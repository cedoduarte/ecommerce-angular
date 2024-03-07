import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { COUNTRY_LIST } from '../../shared/constants';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { selectUser } from "../../store/user.store"
import { Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { setUser } from '../../store/user.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter(), UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  countryList = COUNTRY_LIST;
  toastr = inject(ToastrService);
  userService = inject(UserService);
  store = inject(Store);
  user = this.store.selectSignal(selectUser);

  profileForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phoneNumber: new FormControl("", Validators.required),
    birthdate: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required),
    province: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    zipCode: new FormControl("", Validators.required)
  });

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.store.dispatch(setUser({
      user: JSON.parse(localStorage.getItem("user") as string),
      loggedin: JSON.parse(localStorage.getItem("loggedin") as string)
    }));
    this.profileForm.controls.firstName.setValue(this.user().user?.firstName!);
    this.profileForm.controls.lastName.setValue(this.user().user?.lastName!);
    this.profileForm.controls.email.setValue(this.user().user?.email!);
    this.profileForm.controls.phoneNumber.setValue(this.user().user?.phoneNumber!);
    this.profileForm.controls.birthdate.setValue(this.user().user?.birthdate!);
    this.profileForm.controls.country.setValue(this.user().user?.country!);
    this.profileForm.controls.province.setValue(this.user().user?.province!);
    this.profileForm.controls.city.setValue(this.user().user?.city!);
    this.profileForm.controls.zipCode.setValue(this.user().user?.zipCode!);
  }

  handleSubmit() {
    if (this.profileForm.valid) {
      this.fetchUpdate();
    } else {
      this.handleInvalidForm();
    }
  }

  fetchUpdate() {
    this.userService.updateUser({
      id: this.user().user?.id,
      firstName: this.profileForm.value.firstName!,
      lastName: this.profileForm.value.lastName!,
      email: this.profileForm.value.email!,
      phoneNumber: this.profileForm.value.phoneNumber!,
      birthdate: this.profileForm.value.birthdate!,
      country: this.profileForm.value.country!,
      province: this.profileForm.value.province!,
      city: this.profileForm.value.city!,
      zipCode: this.profileForm.value.zipCode!
    }).subscribe(
      data => {
        this.store.dispatch(setUser({
          user: data,
          loggedin: true
        }));
        this.toastr.success("Profile edited successfully!");
      },
      errorObject => {
        this.toastr.error(errorObject.error.substring(18, errorObject.error.indexOf("!") + 1));
      }
    );
  }

  handleInvalidForm() {
    if (!this.profileForm.controls.firstName.valid) {
      this.toastr.error("First Name is invalid, please check your input!");
    } else if (!this.profileForm.controls.lastName.valid) {
      this.toastr.error("Last Name is invalid, please check your input!");
    } else if (!this.profileForm.controls.email.valid) {
      this.toastr.error("Email is invalid, please check your input!");
    } else if (!this.profileForm.controls.phoneNumber.valid) {
      this.toastr.error("Phone number is invalid, please check your input!");
    } else if (!this.profileForm.controls.birthdate.valid) {
      this.toastr.error("Birthdate is invalid, please check your input!");
    } else if (!this.profileForm.controls.country.valid) {
      this.toastr.error("Country is invalid, please check your input!");
    } else if (!this.profileForm.controls.province.valid) {
      this.toastr.error("Province is invalid, please check your input!");
    } else if (!this.profileForm.controls.city.valid) {
      this.toastr.error("City is invalid, please check your input!");
    } else if (!this.profileForm.controls.zipCode.valid) {
      this.toastr.error("Zip Code is invalid, please check your input!");
    }
  }
}
