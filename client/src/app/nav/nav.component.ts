import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {

  model: any = {};
  user: User;

  constructor(public accountService: AccountService, private router: Router, private toaster: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);

  }

  ngOnInit(): void {
   console.log(this.user)
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (user) => {
        // console.log(user);
        this.router.navigateByUrl('/members');
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      }
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
