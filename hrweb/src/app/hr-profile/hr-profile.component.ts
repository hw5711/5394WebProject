import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../login/login.service";

@Component({
  selector: 'app-hr-profile',
  templateUrl: './hr-profile.component.html',
  styleUrls: ['./hr-profile.component.css']
})
export class HrProfileComponent implements OnInit {
  hr_id = "";
  firstName = "";
  lastName = "";
  phone = "";
  title = "";
  company = "";
  startDate = Date;
  note = "";
  contacts = "";
  showDate: Date;
  filePath: "";

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.hr_id = this.loginService.getUserId();
    this.getHrInfo();
    this.getImage();
  }
  
  //get default account default
  getHrInfo() {
    // console.log("client side:", this.hr_id);
    let req = {
      hr_num: this.hr_id,
    }
    this.http
      .post<{ message: string; account: Account }>(
        "http://localhost:3000/hr/get-profile", req)
      .subscribe(AccountData => {
        this.firstName = AccountData["firstName"];
        this.lastName = AccountData["lastName"];
        this.phone = AccountData["phone"];
        this.title = AccountData["title"];
        this.company = AccountData["company"];
        this.startDate = AccountData["startDate"];
        this.note = AccountData["note"];
        this.contacts = AccountData["contacts"];
      })
  }

  getImage(){
    console.log("get image");
    let req = {
      userInfo: this.hr_id,
    }
    this.http
      .post<{ message: string; account: Account }>(
        "http://localhost:3000/images/get-pic", req)
      .subscribe(AccountData => {
        console.log(" proflile name is(id): " + AccountData["userInfo"]);
        this.filePath = AccountData["img"];
      })
  }

}
