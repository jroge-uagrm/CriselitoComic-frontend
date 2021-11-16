import { Component, OnInit } from '@angular/core';
import { GetApiService } from 'src/app/get-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public activity!: string;
  constructor(private api: GetApiService){
  }
  ngOnInit(): void {
    this.api.createComic("Homero", "Testing Post").subscribe((data:any)=>{
      console.log(data);
      this.activity = data.name;
    })
    /*
    this.api.apiCall().subscribe((data:any)=>{
      this.activity = data.activity;

      
    })*/
  }
  
  

}
