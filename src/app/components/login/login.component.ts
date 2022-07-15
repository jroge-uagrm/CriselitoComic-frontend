import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Constants';
import { GetApiService } from 'src/app/get-api.service';
import { User } from 'src/app/models/user';
import { Utils } from 'src/app/Utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:User
  constructor(
    private api: GetApiService,
    private router: Router
  ) { 
    this.user= new User('','');
  }

  ngOnInit(): void {
  }
  login(){
    this.api.login(this.user).subscribe(
      Response=>{
        console.log(Response);
        Utils.set(Constants.ACTUAL_ACCESS_TOKEN, Response.access_token);
        //Utils.set(Constants.ACTUAL_USER, Response.user.email);
        this.router.navigate(['/home']);
        alert("Inicio de Sesion");
      },
      Error=>{
        console.log(Error.error.msg);
        alert(Error.error.msg);
      }
    )
  }
}
