import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { Product } from '../../Models/product'


import { FileUploadService } from "../../Services/file-upload.service";

import { Location  } from '@angular/common';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {


  messageClass;
  message;


  @Input('products') products: Array<Product> = [];

  public quantity:number = 1;
  Products: any = [];

  constructor(public fileUploadService: FileUploadService,
    private location: Location,
   private router: Router) {
    this.getProducts();
  }

  ngOnInit() { }

  getProducts() {
    this.fileUploadService.getProducts().subscribe((res) => {
      this.Products = res['products'];
    })
  }


  public getQuantity(val){
    this.quantity = val.soldQuantity;
  }



  // Function to delete blogs
  deleteProduct(id) {
    // Function for DELETE request
    this.fileUploadService.deleteProduct(id).subscribe(data => {
      // Check if delete request worked
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error bootstrap class
        this.message = data.message; // Return error message
      } else {

        //this.reloadBlogs() ;
        location.reload();

      }
    });
  }



}

