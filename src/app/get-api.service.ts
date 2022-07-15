import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  baseApiUrl = "https://criselito-comic-backend.herokuapp.com/api/upload";
  // baseApiUrl = "http://localhost:8000/api/upload";

  constructor(private http: HttpClient) { }

  upload(file: any, name: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append("document", file, file.name);
    return this.http.post(this.baseApiUrl, formData)
  }

  iaupload(url: string): Observable<any> {
    const formData = new FormData();
    formData.append("language", 'eng');
    formData.append("isOverlayRequired", 'false');
    formData.append("url", url);
    formData.append("iscreatesearchablepdf", 'false');
    formData.append("issearchablepdfhidetextlayer", 'false');
    formData.append("filetype", 'pdf');
    // formData.append("scale", 'true');
    // formData.append("detectOrientation", 'false');
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('apikey', 'deef01629988957');
    // httpHeaders.append('apikey', 'helloworld');
    return this.http.post('https://api.ocr.space/parse/image', formData, { headers: httpHeaders });
  }
  
  iatranslate(text:string):Observable<any>{
    console.log(text)
    const encodedParams = new URLSearchParams();
    encodedParams.append("text", text);
    encodedParams.append("to", "es");
    encodedParams.append("from", "en");

    console.log(text)
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    httpHeaders = httpHeaders.append('X-RapidAPI-Host','nlp-translation.p.rapidapi.com')
    httpHeaders = httpHeaders.append('X-RapidAPI-Key','db24276902msh71466a572b91ea1p1af87fjsnac9b5e280fd1')
    return this.http.post('https://nlp-translation.p.rapidapi.com/v1/translate', encodedParams, { headers: httpHeaders });
  }

  login(user:User):Observable<any>{
    return this.http.post('http://localhost:8000/api/login',user)
  }

}
