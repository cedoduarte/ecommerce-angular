import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser } from '../../store/user.store';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(setUser({
      user: JSON.parse(localStorage.getItem("user") as string),
      loggedin: JSON.parse(localStorage.getItem("loggedin") as string)
    }));
  }
}
