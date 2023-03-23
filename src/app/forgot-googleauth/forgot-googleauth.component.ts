import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forgot-googleauth',
  templateUrl: './forgot-googleauth.component.html',
  styleUrls: ['./forgot-googleauth.component.css']
})
export class ForgotGoogleauthComponent implements OnInit {

  showError = false;
  showSuccess = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  reset2FA(){

    this.showError = false;

    this.userService.Forgot2Fa().subscribe( (res) => {

        if(!res.status){
          this.showError = true;
          return;
        }

        this.showSuccess = true;
    });
  }

}
