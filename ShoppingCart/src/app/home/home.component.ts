import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { product } from '../shared/product';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products!:product[];
  constructor(private homeProductService:ProductService, private  cartService:CartService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.homeProductService.getProduct().subscribe(res=>{
        this.products=res as product[];
    })
  }

  addToCart(product:product){
    this.cartService.addToCart(product);
  }
}
