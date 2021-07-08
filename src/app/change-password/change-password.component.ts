import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
let backEndUrl = environment.apiUrl;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  submitform(form) {

    console.log(form.value);
    this.http.post(`${backEndUrl}/api/reset`, { email: form.value.emailId }).subscribe(res => {
      alert("Mail sent!!");
    })


  }
}
