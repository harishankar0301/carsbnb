import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
let backEndUrl = environment.apiUrl;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  submitform(form) {
  
    console.log(form.value);
    this.http.post(`${backEndUrl}/api/signup`, { name: form.value.name, email: form.value.emailId, password: form.value.password }).subscribe(res => {
      console.log(res);

      alert("Registered!");

    })
  }
}
