import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
let backEndUrl = environment.apiUrl;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  submitform(form) {
  
    console.log(form.value);
    this.http.post(`${backEndUrl}/api/loginv`, { email: form.value.emailId, password: form.value.password }).subscribe(res => {
      console.log(res);
      if (res['resp'] == "AUTHORIZED") {
        this.router.navigate([`/listing`]);
        sessionStorage.setItem('info',JSON.stringify({email: form.value.emailId}))

      } else {
        alert("Not authorized");
      }
    })


  }
}
