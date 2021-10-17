import { Component, OnInit } from '@angular/core';
import { CartItem } from '../shared/product';
import { CartService } from '../shared/cart.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  formCheckout: FormGroup;
  shoppingCart!: CartItem[];
  totalPrice: number = 0;
  product: any;
  status: boolean =false;

  constructor(private cartService: CartService, private fb: FormBuilder) {
    this.getShoppingCart();
    this.formCheckout = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      products: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    console.log(this.formCheckout);
  }
  getShoppingCart() {
    this.shoppingCart = this.cartService.getCartItems();
    this.totalPrice = this.cartService.caculateTotal();
  }

  valueChange(i: number, quan: any) {
    this.shoppingCart[i].quantity = quan.value;
    this.totalPrice = this.cartService.caculateTotal();
  }

  delete() {
    this.shoppingCart.splice(this.shoppingCart.indexOf(this.product, 1));
    this.totalPrice = this.cartService.caculateTotal();
  }

  addList() {
    let list = this.formCheckout.get('products') as FormArray;
    list.reset();
    this.shoppingCart.forEach(x => {
      x.product.quantity = x.quantity;
      list.push(new FormControl(x.product))
    });
  }

  submitForm() {
    this.addList();
    this.cartService.addProduct(this.formCheckout.value).subscribe(res => {
      console.log(res);
      if (res.status == 200) {
        this.status = true;
        alert("Sucessfull!");
      }
    });
  }

  get InfoUserName() { return this.formCheckout.get('userName')?.value;}
  get InfoUserPhone() { return this.formCheckout.get('phoneNumber')?.value;}
  get InfoUserAddress() { return this.formCheckout.get('address')?.value;}

  get userName() { return this.formCheckout.get('userName'); }
  get phoneNumber() { return this.formCheckout.get('phoneNumber'); }
  get address() { return this.formCheckout.get('address'); }
}
