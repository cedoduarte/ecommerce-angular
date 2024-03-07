import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { selectDrawer } from "./store/drawer.store";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setUser } from "./store/user.store";
import { toggleDrawer } from './store/drawer.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatDrawer, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
  store = inject(Store);
  drawer = this.store.selectSignal(selectDrawer);
  router = inject(Router);

  handleStockClicked() {
    this.store.dispatch(toggleDrawer({
      opened: false
    }));
    this.router.navigate(["/stock"]);
  }

  handleProfileClicked() {
    this.store.dispatch(toggleDrawer({
      opened: false
    }));
    this.router.navigate(["/profile"]);
  }

  handleSettingClicked() {
    this.store.dispatch(toggleDrawer({
      opened: false
    }));
    this.router.navigate(["/setting"]);
  }

  handleSignOutClicked() {
    this.store.dispatch(toggleDrawer({
      opened: false
    }));
    this.store.dispatch(setUser({
      user: null,
      loggedin: false
    }));
    this.router.navigate(["/login"]);
  }
}
