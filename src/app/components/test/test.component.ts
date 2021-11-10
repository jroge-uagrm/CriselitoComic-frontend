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
    api.apiCall().subscribe((data:any)=>{
      this.activity = JSON.stringify(data, ['activity']);
    })
  }
  ngOnInit(): void {

  }
  
  

}
