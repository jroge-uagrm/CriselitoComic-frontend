import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
