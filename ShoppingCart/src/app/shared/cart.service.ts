import { Injectable } from '@angular/core';
import { CartItem, product } from './product';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private static cartItems: CartItem[] = [];
  constructor(private httpClient:HttpClient) { }

  addToCart(product: product) {
    var itemExisting= this.getCartItems().find(x=>x.product.id==product.id);
    if(itemExisting==undefined){
      CartService.cartItems.push({product:product,quantity:1});
    }
    else{
      itemExisting.quantity++;
    }
  }

  caculateTotal(){
    return this.getCartItems().reduce((total,item)=> (100-item.product.promotionPrice)/100 *  item.product.price *item.quantity + total,0)
  }
  getCartItems(){
    return CartService.cartItems;
  }

  addProduct(product:any){
    const apiUrl ="https://steelsoftware.azurewebsites.net/api/FresherFPT/CheckOut";
    const option ={
      header: new HttpHeaders({
        'Content-Type':'application/json'
      }),
      observe: 'response' as const
    }
    return this.httpClient.post(apiUrl,product,option);
  }
}
