import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { GetApiService } from 'src/app/get-api.service';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  public document!: {
    name: string,
    description: string,
  }
  uploaded!: boolean;
  documentForm!: FormGroup;
  shortLink: string = "";
  file!: File;

  constructor(
    private api: GetApiService,
    private formBuilder: FormBuilder) {
    this.uploaded = false;
    this.document = {
      name: "",
      description: "",
    };
    this.documentForm = this.formBuilder.group({
      name: [this.document.name, [Validators.required, Validators.minLength(3)]],
      description: [this.document.description, Validators.required],
    });
  }

  public nameIsValid(): boolean {
    return this.documentForm.controls['name'].untouched || this.documentForm.controls['name'].valid;
  }

  public descriptionIsValid(): boolean {
    return this.documentForm.controls['description'].untouched || this.documentForm.controls['description'].valid;
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    if (this.documentForm.valid) {
      this.api.upload(this.file, this.document.name, this.document.description).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.shortLink = event.link;
          }
          this.shortLink = event.url;
          this.uploaded = true;
        }
      );
      this.api.iaupload(this.shortLink).subscribe(
        (event: any) => {
          if (typeof (event) === 'object') {
            this.shortLink = event.link;
          }
        }
      );
    }
  }
}
