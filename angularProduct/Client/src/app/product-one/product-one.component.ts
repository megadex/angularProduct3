import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from '../product';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DBOperation } from '../operation.enum';
@Component({
  selector: 'app-product-one',
  templateUrl: './product-one.component.html',
  styleUrls: ['./product-one.component.css']
})
export class ProductOneComponent implements OnInit {
  productFrm: FormGroup;
  @Input() dbops: DBOperation;
  @Input() modalTitle: string;
  @Input() modalBtnTitle: string;
  @Input() products: IProduct[];
  @Input() product: IProduct;
  @Input() showForm: boolean;
  @Input() fieldCtrl: boolean;
  @Input() classButton: string;
  @Output() onClose = new EventEmitter();
  @Output() onChanged = new EventEmitter();
  categoryType = [
    { value: 'Fruit', viewValue: 'Fruit' },
    { value: 'Vegetables', viewValue: 'Vegetables' }
  ];
  stateCtrl: FormControl;
  // selectedOption: string;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.productFrm = this.fb.group({
      ProductId: [''],
      ProductName: ['', [Validators.required, Validators.maxLength(10)]],
      CategoryType: ['', Validators.required]
    });
    this.productFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
    /*
    if (this.dbops == DBOperation.create)
      this.productFrm.reset();
    else
      this.productFrm.setValue(this.product);
    */
    this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
  }
  
  onValueChanged(data?: any) {
    if (!this.productFrm) { return; }
    const form = this.productFrm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  
  close(): void {
    this.onClose.emit();
  }
  /*
  change(increased: any) {
    this.onChanged.emit(increased);
  }
  */
  changeProductFrm(product: IProduct) {
    this.productFrm.setValue(product);
  }

  resetProductFrm() {
    this.productFrm.reset();
  }
  
  change() {
    this.onChanged.emit();
  }
  
  formErrors = {
    'ProductName': '',
    'CategoryType': ''
  };
  validationMessages = {
    'ProductName': {
      'maxlength': 'Product Name cannot be more than 10 characters long.',
      'required': 'Product Name is required.'
    },
    'CategoryType': {
      'required': 'Category Type is required.'
    }
  };

  onSubmit(formData: any) {
    // console.log(formData.value);
    switch (this.dbops) {
      case DBOperation.create:
        // alert(formData.value ? 1 : 0);
        this.productService.post(formData.value).subscribe(
          () => {
            this.productFrm.reset();
            this.change();
          }
        );
        break;
      case DBOperation.update:
        // console.log(this.product);

        // alert(`New Name: ${this.product.ProductName}`);

        this.productService.update(formData.value).subscribe(
          () => {
            this.close();
            this.productFrm.reset();
            this.change();
          }
        );
        break;
      case DBOperation.delete:
        this.productService.delete(formData.value).subscribe(
          // product => this.products = this.products.filter(p => p !== product)
          () => {
            this.close(); 
            this.productFrm.reset(); 
            this.change(); // update the list
          } 
        );
        break;
    }
  }
  
  SetControlsState(isEnable: boolean) {
    isEnable ? this.productFrm.enable() : this.productFrm.disable();
  }
}
