import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public progress!: number;
  public message!: string;
  public fileUrl!: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    if (files!.length === 0) {
      return;
    }
    let fileToUpload = <File>files![0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(
      environment.backendUrl + '/comics/0/files',
      formData,
      { reportProgress: true, observe: 'events' }
    )
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          console.log(event.body);
          this.fileUrl = event.body.filePath;
        }
      });
  }

}
