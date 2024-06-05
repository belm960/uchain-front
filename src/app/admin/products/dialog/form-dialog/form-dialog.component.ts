import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Product } from '../../product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/doctor/products/product.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  dialogTitle: string;
  orderForm: FormGroup;
  product: Product;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Set the defaults
    this.dialogTitle = data.product.name;
    this.product = data.product;
    this.orderForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.orderForm = this.fb.group({
      quantity: [this.product.quantity, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
      const data = {
        "quantity": `${this.orderForm.value.quantity}`,
        "product": [
          {
            "id": this.product.id
          }
        ]
      }
      this.productService.addOrder(data).subscribe(
        _=> {
            this.showNotification(
              'snackbar-success',
              'Order Submitted Successfully...!!!',
              'bottom',
              'center'
            );
          },
        _=> {
          this.showNotification(
            'snackbar-danger',
            'Ops! can not place order. Try Again...!!!',
            'bottom',
            'center'
          );
        }
      );
    }

    showNotification(colorName, text, placementFrom, placementAlign) {
      this.snackBar.open(text, '', {
        duration: 2000,
        verticalPosition: placementFrom,
        horizontalPosition: placementAlign,
        panelClass: colorName,
      });
    }
}
