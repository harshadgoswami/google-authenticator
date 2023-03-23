import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register2fa',
  templateUrl: './register2fa.component.html',
  styleUrls: ['./register2fa.component.css']
})
export class Register2faComponent implements OnInit {

  qr:String = null;

  register2faForm = this.formBuilder.group({
    code: ''
  });

  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private ngZone: NgZone
    ) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.qr =  this.router.getCurrentNavigation().extras.state.qr;
  }

  ngOnInit(): void {
  
  }

  onSubmit(): void {

    console.warn('Register form is submitted', this.register2faForm.value);
    this.userService.VerifyUser(this.register2faForm.value)
    .subscribe((res) => {
        
        // save token in local storage
        localStorage.setItem("token", res.data.token);
        this.register2faForm.reset();
        this.ngZone.run(() => this.router.navigateByUrl('/private'));
      }, (err) => {
        console.log(err);
    });

  }

}
