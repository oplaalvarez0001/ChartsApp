import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  registerForm: FormGroup;


  model: any = {};

  constructor(private accountService: AccountService, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  register() {
    console.log(this.registerForm.value);

    // this.accountService.register(this.model).subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // }, err => {
    //   console.log(err);
    //   this.toaster.error(err.error)
    // })
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('Initial value', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('',Validators.required)
    })

  }




  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
