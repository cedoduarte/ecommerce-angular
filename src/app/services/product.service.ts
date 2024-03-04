import { Injectable, inject } from '@angular/core';
import { IProductViewModel, ICreateProductDto, IUpdateProductDto } from "../shared/interfaces";
import { Observable, share } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AUTHORIZATION_TOKEN, URL_PRODUCT_CREATE, URL_PRODUCT_DELETE, URL_PRODUCT_GET_BY_ID, URL_PRODUCT_GET_LIST, URL_PRODUCT_RESTORE, URL_PRODUCT_UPDATE } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  constructor() { }

  createProduct(body: ICreateProductDto): Observable<IProductViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.post<IProductViewModel>(URL_PRODUCT_CREATE, body, { headers }).pipe(share());
  }

  deleteProduct(id: number): Observable<IProductViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.delete<IProductViewModel>(`${URL_PRODUCT_DELETE}/${id}`, { headers }).pipe(share());
  }

  restoreProduct(id: number): Observable<IProductViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.put<IProductViewModel>(`${URL_PRODUCT_RESTORE}/${id}`, { headers }).pipe(share());
  }

  updateProduct(body: IUpdateProductDto): Observable<IProductViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.put<IProductViewModel>(URL_PRODUCT_UPDATE, body, { headers }).pipe(share());
  }

  getProductById(id: number): Observable<IProductViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.get<IProductViewModel>(`${URL_PRODUCT_GET_BY_ID}/${id}}`, { headers }).pipe(share());
  }

  getProductList(getAll: boolean, keyword: string): Observable<IProductViewModel[]> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.get<IProductViewModel[]>(`${URL_PRODUCT_GET_LIST}?GetAll=${getAll}&Keyword=${keyword}`, { headers }).pipe(share());
  }
}
