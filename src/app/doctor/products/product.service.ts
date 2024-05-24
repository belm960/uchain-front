import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { Product } from './product.model';
import { catchError } from 'rxjs/operators';
@Injectable()
export class ProductService {
  // Temporarily stores data from dialogs
  dialogData: any;
  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  constructor(private httpClient: HttpClient,  private tokenStorage: TokenStorageService) {}
  get data(): Product[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData
  }
  getMyProduct(){
    const getMyProductUrl = apiUrl+'products';
    return this.httpClient.get<Product[]>(getMyProductUrl);
  }
  addProduct(formData: FormData): Observable<string> {
    const addProductUrl = apiUrl+'product/create';
    return this.httpClient.post<string>(addProductUrl, formData);
    }
  editProduct(formData: FormData, id): Observable<string> {
    const addProductUrl = apiUrl+'product/'+id+'/update';
    return this.httpClient.put<string>(addProductUrl, formData);
      }
  deleteProduct(id) {
    const deleteProductUrl = apiUrl+'product/'+id+'/destroy';
    return this.httpClient.delete(deleteProductUrl);
    }
}
