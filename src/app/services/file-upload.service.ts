import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  baseURL = "http://localhost:5000/api";
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get Products
  getProducts() {
    return this.http.get(this.baseURL)
  }

  // Create Product
  addProduct(name: string, profileImage: File, newPrice: number, availibilityCount: number, description: string): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", name);
    formData.append("avatar", profileImage);
    formData.append("newPrice", newPrice);
    formData.append("availibilityCount", availibilityCount);
    formData.append("description", description);


    return this.http.post<Product>(`${this.baseURL}/create-product`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }



// Get Product By Id
getProductById(id): Observable<any> {
  let API_URL = `${this.baseURL}/read-product/${id}`;
  return this.http.get(API_URL, { headers: this.headers }).pipe(
  map((res: Response) => {
  return res || {}
  }),
  catchError(this.errorMgmt)
  )
  }






  // Delete product
  deleteProduct(id): Observable<any> {
    let url = `${this.baseURL}/deleteProduct/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }




  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
