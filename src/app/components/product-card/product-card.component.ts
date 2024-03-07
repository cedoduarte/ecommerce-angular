import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe],
  providers: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() description!: string;
  @Input() price!: number;
  @Input() stock!: number;
  @Input() imagehref!: string;
  @Input() lastModified!: string;
  @Input() createdDate!: string;
  @Input() isDeleted!: boolean;
  currencyPipe = inject(CurrencyPipe);
}
