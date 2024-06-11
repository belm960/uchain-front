import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { TokenStorageService } from 'src/app/shared/security/token-storage.service';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/shared/security/user';
import { Rate } from './rate';
@Injectable()
export class UserService {
  // Temporarily stores data from dialogs
  dialogData: any;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<
    User[]
  >([]);
  rate: Rate[] = [];
  totalRate: number = 0;
  constructor(private httpClient: HttpClient,  private tokenStorage: TokenStorageService) {}
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData
  }
  getOneUser(id){
    const getOneUserUrl = apiUrl+'user/'+id;
    return this.httpClient.get<User>(getOneUserUrl);
  }
  getRatings(){
    const getOneProductUrl = apiUrl+'ratings/'
    return this.httpClient.get<Rate[]>(getOneProductUrl);
  }
  getSellerRating(username: string): number{
    this.getRatings().subscribe(
      data=>{
        this.totalRate = 0;
        data.forEach(element => {
          if(element.receiver == username){
            this.totalRate+=+element.rating_value
          }
        });
      },_=>{
        console.log('Cant get Ratings')
      }
    )
    return this.totalRate
  }
  getSellerComments(username: string): Rate[] {
    this.rate = []
    this.getRatings().subscribe(
      data=>{
        data.forEach((element)=>{
          if(element.receiver==username){
            this.rate.push(element);
          }
        })
      }
    )
    return this.rate;
  }

}
