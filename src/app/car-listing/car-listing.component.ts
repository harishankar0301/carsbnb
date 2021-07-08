import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';
let backEndUrl = environment.apiUrl;

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.css']
})
export class CarListingComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }

  carlist = [];
  ngOnInit(): void {
    this.http.get(`${backEndUrl}/api/list`).subscribe(res => {
      console.log(res);

      this.carlist = res['resp'];

    })

  }

  booking(uid) {
     let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
    if (!sessioninfo) {
      alert("Please login")
      this.router.navigate([`/login`]);
    }
    let modal = document.getElementById('bookingButton');
    this.http.post(`${backEndUrl}/api/book`, { email: sessioninfo["email"], uid: uid }).subscribe(res => {
      console.log(res);

    })
    modal.click();

  }
  okay() {
    window.location.reload();
  }


}
