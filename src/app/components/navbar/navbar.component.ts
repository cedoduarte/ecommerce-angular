import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Store } from '@ngrx/store';
import { selectDrawer, toggleDrawer } from '../../store/drawer.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  store = inject(Store);
  drawer = this.store.selectSignal(selectDrawer);

  handleToggleDrawer() {
    this.store.dispatch(toggleDrawer({
      opened: !this.drawer().opened
    }));
  }

  handleGoShoppingCart() {
    console.log("go shopping cart");
  }
}
