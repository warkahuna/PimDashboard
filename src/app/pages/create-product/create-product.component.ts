import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from "../../Services/file-upload.service";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

import { Location  } from '@angular/common';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})

export class CreateProductComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  products = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService
  ) {
    // Reactive Form
    this.form = this.fb.group({
      name: [''],
      avatar: [null],
      newPrice: [''],
      availibilityCount: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addProduct(
      this.form.value.name,
      this.form.value.avatar,
      this.form.value.newPrice,
      this.form.value.availibilityCount,
      this.form.value.description
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Product successfully created!', event.body);
          this.percentDone = false;
          //this.router.navigate(['products-list'])
          location.reload();

      }
    })
  }

}
