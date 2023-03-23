import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  showError = false;
  showSuccess = false;
  otpForm = this.formBuilder.group({
        code: ''
  });

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private ngZone: NgZone,
              private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.showError = false;
    this.showSuccess = false;

    console.warn('Register form is submitted', this.otpForm.value);
    this.userService.VerifyUser(this.otpForm.value)
    .subscribe((res) => {
        // save token in local storage
        
        if(!res.status){
          this.showError = true;
          return ;
        }

        localStorage.setItem("token", res.data.token);
        this.otpForm.reset();
        this.ngZone.run(() => this.router.navigateByUrl('/private'));
      }, (err) => {
        console.log(err);
    });
  }

  forgot2fa(){

    this.showError = false;
    this.showSuccess = false;
    console.warn('Register form is submitted', this.otpForm.value);
    this.userService.VerifyUser(this.otpForm.value)
    .subscribe((res) => {
        // save token in local storage
        if(!res.status){
          this.showError = true;
          return ;
        }

        this.showSuccess = true;
        
      }, (err) => {
        console.log(err);
    });
  }

}
