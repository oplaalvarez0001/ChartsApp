import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './_models/users';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Charts App';
  users: any;

  constructor(private accountService: AccountService) {

  }


  ngOnInit(): void {
    this.setCurrentUser()
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }


}

