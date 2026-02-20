import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/productModel';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.data;
      console.log(res.data);
      
    });
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  editProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }

  createProduct() {
    this.router.navigate(['/create']);
  }


}
