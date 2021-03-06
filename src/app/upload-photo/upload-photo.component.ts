import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
let backEndUrl = environment.apiUrl;
@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.css']
})
export class UploadPhotoComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  images;
  multipleImages = [];

  selectMultipleImage(event) {


    this.multipleImages = event.target.files;
  }

  onMultipleSubmit() {
    const formData = new FormData()
    for (let img of this.multipleImages) {
      formData.append('files', img);


    }
    let sessioninfo = JSON.parse(sessionStorage.getItem('info'));

    this.http.post(`${backEndUrl}/multipleFiles/${sessioninfo["email"]}`, formData).subscribe(
      (res) => {
        console.log(res)

      },
      (err) => console.log(err)
    );
  }

}
