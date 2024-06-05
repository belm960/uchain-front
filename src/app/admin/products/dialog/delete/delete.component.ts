import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/doctor/products/product.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productService: ProductService,
    private snackBar: MatSnackBar
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.productService.deleteProduct(this.data.id).subscribe(
      _=>{
        this.showNotification(
          'snackbar-success',
          'Product Deleted Successfully...!!!',
          'bottom',
          'center'
        );
      },
      _=>{
        this.showNotification(
          'snackbar-danger',
          'Cant Delete it Try Agian...!!!',
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