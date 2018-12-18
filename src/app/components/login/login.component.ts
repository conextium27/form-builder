import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { URLSearchParams } from "@angular/http";
// 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  usuario: String;
  password: String;

  constructor() { }

  ngOnInit() {
  }

  login(forma: NgForm) {
    console.log(forma.value);
   
  }

}
