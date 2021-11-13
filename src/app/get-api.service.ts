import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(
    private http:HttpClient
  ) { }
  apiCall(){
    return this.http.get('https://www.boredapi.com/api/activity');
  }
  createComic(comicName: string, comicDescription: string){
    return this.http.post('https://criselitocomic-backend.azurewebsites.net/api/comics',{
      name: comicName,
      description: comicDescription
    })
  }
}
