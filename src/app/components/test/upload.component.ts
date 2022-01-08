import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetApiService } from 'src/app/get-api.service';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public document!: {
    name: string,
    description: string,
  }
  uploaded!: boolean;
  documentForm!: FormGroup;

  constructor(private api: GetApiService) {
    this.uploaded = false;
  }

  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  ngOnInit(): void {
    this.documentForm = new FormGroup({
      name: new FormControl(
        this.document.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl(
        this.document.description, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

  }

  get name() { return this.documentForm.get('name'); }

  get description() { return this.documentForm.get('description'); }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    this.api.upload(this.file, this.document.name, this.document.description).subscribe(
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
