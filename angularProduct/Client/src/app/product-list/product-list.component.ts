import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { DBOperation } from '../operation.enum';
import { ProductOneComponent } from '../product-one/product-one.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[];
  product: IProduct;
  modalTitle: string;
  modalBtnTitle: string;
  dbops: DBOperation;
  showForm: boolean = false;
  fieldCtrl: boolean = false;
  classButton: string;
  // selectedOption: string;
  @ViewChild(ProductOneComponent, { static: false })
  private formValueComponent: ProductOneComponent;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.LoadProducts();
  }

  LoadProducts(): void {
    this.productService.get()
      .subscribe(products => this.products = products);
  }

  addProduct(): void {
    this.dbops = DBOperation.create;
    this.modalTitle = `<i class="material-icons">add_box</i> Add New Product`;
    this.modalBtnTitle = "Add";
    this.classButton = "btn-primary";
    if (this.fieldCtrl === true) this.fieldCtrl = false;
    this.resetProductFrm();
    if (this.showForm === false) this.showForm = true;
  }

  editProduct(product: IProduct): void {
    this.dbops = DBOperation.update;
    this.modalTitle = `<i class="material-icons">mode_edit</i> Edit Product <span class="text-warning">"${product.ProductName}"</span>`;
    this.modalBtnTitle = "Update";
    this.classButton = "btn-warning";
    // this.product = product;
    this.changeProductFrm(product);
    if (this.fieldCtrl === true) this.fieldCtrl = false;
    // console.log(`ProductName = ${product.ProductName}`);
    if (this.showForm === false) this.showForm = true;
  }

  deleteProduct(product: IProduct): void {
    this.dbops = DBOperation.delete;
    this.modalTitle = `<i class="material-icons">delete_sweep</i> Confirm to Delete <span class="text-danger">"${product.ProductName}"</span>?`;
    this.modalBtnTitle = "Delete";
    this.classButton = "btn-danger";
    // this.product = this.products.filter(x => x.ProductId == product.ProductId)[0];
    // this.product = product;
    this.changeProductFrm(product);
    if (this.fieldCtrl === false) this.fieldCtrl = true;
    // console.log(`ProductName = ${product.ProductName}`);
    if (this.showForm === false) this.showForm = true;
  }

  changeProductFrm(product: IProduct) {
    this.formValueComponent.changeProductFrm(product);
  }

  resetProductFrm() {
    this.formValueComponent.resetProductFrm();
  }

  close(): void {
    this.showForm = !this.showForm;
  }
}
