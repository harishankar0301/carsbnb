import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-photo',
  templateUrl: './view-photo.component.html',
  styleUrls: ['./view-photo.component.css']
})
export class ViewPhotoComponent implements OnInit {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }
  carlist = [];
  emailid1 = JSON.parse(sessionStorage.getItem('info'))["email"];
  imageURL = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64, byblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxErkJggg==");
  ngOnInit(): void {
    let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
    this.http.get<{ resp: string }>(`http://localhost:3000/api/view/${sessioninfo["email"]}`).subscribe(
      (res) => {
        console.log(res);
        this.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + res['resp']);
        // this.imageURL = 'data:image/png;base64,' + new Buffer(res[0]['image'], 'binary').toString('base64')

      },
      (err) => console.log(err)
    );

    this.http.get(`http://localhost:3000/api/rented/${sessioninfo["email"]}`).subscribe(
      (res) => {
        console.log(res);
        this.carlist = res['resp'];
        // this.imageURL = 'data:image/png;base64,' + new Buffer(res[0]['image'], 'binary').toString('base64')

      },
      (err) => console.log(err)
    );
  }

  returncar(uid) {
    let sessioninfo = JSON.parse(sessionStorage.getItem('info'));
   
   //let modal = document.getElementById('bookingButton');
   this.http.post('http://localhost:3000/api/return', { email: sessioninfo["email"], uid: uid }).subscribe(res => {
     console.log(res);

   })
    alert("Returned! Thanks");

 }


}
