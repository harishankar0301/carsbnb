import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router'
let backEndUrl = environment.apiUrl;
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  selectedCar= {
    uid: "",
    pic: "",
    price: 0,
    model: "",
    description: "",
    owner: "",
    isrented: '0',
    features: [],
  }
  ngOnInit(): void {

    let car_id = JSON.parse(sessionStorage.getItem('selectedCar'));
    console.log(car_id);
    this.http.get(`${backEndUrl}/api/specificCar/${car_id}`).subscribe(res => {
      console.log(res['resp']);
      this.selectedCar = res['resp'];
      if(this.selectedCar.description==null || this.selectedCar.description.length<3){
        this.selectedCar.description="No description provided";
      }

      // this.carlist = res['resp'];

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
  okay_click() {
    window.location.reload();
  }

}
