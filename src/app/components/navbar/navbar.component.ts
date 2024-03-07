import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { selectDrawer, toggleDrawer } from '../../store/drawer.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  store = inject(Store);
  router = inject(Router);
  drawer = this.store.selectSignal(selectDrawer);

  handleToggleDrawer() {
    this.store.dispatch(toggleDrawer({
      opened: !this.drawer().opened
    }));
  }

  handleGoShoppingCart() {
    this.router.navigate(["/shopping-cart"]);
  }
}
