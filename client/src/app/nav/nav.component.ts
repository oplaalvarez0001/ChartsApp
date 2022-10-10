import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Observable } from 'rxjs';
import { User } from '../_models/users';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  model: any = {}
 

  constructor(public accountService: AccountService) {


  }

  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
      }, error: (err) => {
        console.log(err)
      }
    })
  }

  logout() {
    this.accountService.logout();
  }

}
