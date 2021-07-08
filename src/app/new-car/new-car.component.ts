import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
let backEndUrl = environment.apiUrl;
@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
    if (!sessioninfo) {
      alert("Please login")
      this.router.navigate([`/login`]);
    }

  }
  submitform(form) {

    let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
    console.log(form.value);
    this.http.post(`${backEndUrl}/api/carsup`, { owner: sessioninfo["email"], model: form.value.model, pic: form.value.pic, price: form.value.price }).subscribe(res => {
      console.log(res);
      alert("Car added!!");
      this.router.navigate([`/listing`]);

    })


  }

}
