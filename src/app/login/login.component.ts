import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showError = false;
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });


  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    this.showError = false;
    console.warn('Login form is submitted', this.loginForm.value);
    this.userService.Login(this.loginForm.value)
    .subscribe((res) => {
        console.log('Data added successfully!')

        if(res.status){
          this.loginForm.reset();
          this.ngZone.run(() => this.router.navigateByUrl('/otp'));
        }else{
          this.showError = true;
          this.loginForm.reset();
        }
        
      }, (err) => {
        console.log(err);
    });
  }

}
