import { Component, inject } from '@angular/core';
import { SearchTextfieldComponent } from '../../components/search-textfield/search-textfield.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { IProductViewModel } from '../../shared/interfaces';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [SearchTextfieldComponent, ProductCardComponent, HttpClientModule],
  providers: [ProductService],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  productService = inject(ProductService);
  toastr = inject(ToastrService);
  productList: IProductViewModel[] = [];

  handleSearchTriggered(keyword: string) {
    this.productService.getProductList(false, keyword).subscribe(
      data => {
        this.productList = data;
      },
      errorObject => {
        this.toastr.error(errorObject.error.substring(18, errorObject.error.indexOf("!") + 1));
      });
  }
}
