import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService, private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);

    this.accountService.register(this.model).subscribe(response => {
      console.log(response);
      this.cancel();
    }, err=>{
      console.log(err);
      this.toaster.error(err.error)
    })
  }





  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
