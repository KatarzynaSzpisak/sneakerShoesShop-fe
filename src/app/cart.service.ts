import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './components/product-list/product-list.component';
import { Observable } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // items = [];

  constructor(
    private http: HttpClient,
    private router: Router) {}

  async addToCart(product: IProduct) {
    const newRow = {
      id: 0,
      customerId: 1,
      orderId: 0
    };
    const response = await fetch(
      'http://localhost:5000/orderRow/' + product.id,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRow)
      }
    );
    return await response.json();
  }

  getItems() {
    return fetch('http://localhost:5000/orderRow/1').then(response =>
      response.json()
    );
  }

  async removeCartItemAsync(orderRowId) {
    const response = await fetch(
      'http://localhost:5000/orderRow/' + orderRowId,
      {
        method: 'DELETE'
      }
    );
  }

  removeCartItem(orderRowId) {
    this.removeCartItemAsync(orderRowId).then(_ => location.reload());
  }

  totalPrice(items) {
    let summ = 0;
    items.forEach(element => {
      summ += element.product.price;
    });
    return summ;
  }

  clearCart() {
    // return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }

  async createOrder() {
    const response = await fetch('http://localhost:5000/order/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    this.router.navigate(['/thanks']);
  }
}
