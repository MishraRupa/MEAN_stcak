import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/productModel';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  isEditMode: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
    });

     this.productId = this.route.snapshot.params['id'];

    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct();
    }
  }

  loadProduct() {
    this.productService.getProducts().subscribe(res => {
      const product = res.data.find((p: Product) => p._id === this.productId);
      this.productForm.patchValue(product);
    });
  }

  onSubmit() {

    if (this.productForm.invalid) return;

    const productData: Product = this.productForm.value;

    if (this.isEditMode) {
      this.productService.updateProduct(this.productId, productData)
        .subscribe(() => 
          this.router.navigate(['/']));
        
        
      
    } else {
      this.productService.createProduct(productData)
        .subscribe(() => 
          this.router.navigate(['/']));
    
    }
  }

  }

 
