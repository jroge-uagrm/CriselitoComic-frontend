import { Component, OnInit } from '@angular/core';
import { GetApiService } from 'src/app/get-api.service';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public activity!: string;
  name!: string;
  description!: string;
  uploaded!: boolean;

  constructor(private api: GetApiService) {
    this.uploaded = false;
  }

  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    this.api.upload(this.file, this.name, this.description).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
        console.log(event);
        this.shortLink = event.url;
        this.uploaded = true;
      }
    );
    this.api.iaupload(this.shortLink).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
        console.log(event);
      }
    );
  }


}
