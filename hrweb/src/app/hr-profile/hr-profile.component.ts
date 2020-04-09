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

  constructor(
    private http: HttpClient,
    public route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.hr_id = this.loginService.getUserId();
    this.getHrInfo();
  }
  
  //get default account default
  getHrInfo(){
      console.log("hr id is:" , this.hr_id);
      this.http
        .get<{ message: string; account: Account }>(
          "http://localhost:3000/hr/" + this.hr_id)
        .subscribe(AccountData => {
          console.log("HR info" , AccountData);
          this.firstName = AccountData["firstName"];
          this.lastName = AccountData["lastName"];
          this.phone = AccountData["phone"];
          this.title = AccountData["title"];
          this.company = AccountData["company"];
          this.startDate = AccountData["startDate"];
          this.note = AccountData["note"];
          this.contacts = AccountData["contacts"];
        })
        // console.log("date1: " , this.startDate);
        
        // var year, month;
        // for(var i=0; i<this.startDate.length; i++){
        //   console.log("date at", i , " value is: " , this.startDate[i]);
        // }
        // this.showDate = new Date();

  }

}
