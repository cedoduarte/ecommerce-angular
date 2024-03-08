import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.store';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { MatDividerModule } from '@angular/material/divider';
import { DeleteAccountComponent } from '../../components/delete-account/delete-account.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ChangePasswordComponent, MatDividerModule, DeleteAccountComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(setUser({
      user: JSON.parse(localStorage.getItem("user") as string),
      loggedin: JSON.parse(localStorage.getItem("loggedin") as string)
    }));
  }
}
