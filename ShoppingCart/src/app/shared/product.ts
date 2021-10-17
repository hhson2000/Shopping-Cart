import { FormGroup } from "@angular/forms";

export interface product {
    id: string;
    productName: string;
    quantity: number;//int,float,double,..
    price: number;
    promotionPrice: number
    image: string;
  }
  
  export interface CartItem{
    product:product,
    quantity:number
  }
  