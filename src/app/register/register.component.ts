import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
               private router: Router,
               private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    console.warn('Register form is submitted', this.registerForm.value);
    this.userService.RegisterUser(this.registerForm.value)
    .subscribe((res) => {
        console.log('Data added successfully!')
        this.registerForm.reset();
        this.ngZone.run(() => this.router.navigateByUrl('/register-2fa' , { state : { qr : res.data.qr } }));
      }, (err) => {
        console.log(err);
    });

  }

}
