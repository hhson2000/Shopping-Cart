import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) {
    this.getProduct();
   }

  getProduct(){
    const apiUrl="https://steelsoftware.azurewebsites.net/api/FresherFPT";
    return this.httpClient.get(apiUrl);
  }

  
}
