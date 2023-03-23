import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
@Component({
  selector: 'app-reset2-fa',
  templateUrl: './reset2-fa.component.html',
  styleUrls: ['./reset2-fa.component.css']
})
export class Reset2FAComponent implements OnInit {

  getId: any;
  qr : any;
  showError = false;
  showSuccess = false;
  reset2faForm = this.formBuilder.group({
    code: '',
    password: ''
  });

  constructor(private activatedRoute : ActivatedRoute,
              private userService: UserService,
              private formBuilder: FormBuilder
    ) { 

      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      
      this.userService.GenerateQR(this.getId).subscribe(
        (res) => {

          if(!res.status){
            this.showError = true;
            return ;
          }

          if(res.status){
             this.qr = res.data.qr;
          }

        });

    }

  ngOnInit(): void {
  }

  onSubmit() {

    this.showError = false;
    this.showSuccess = false;
    let obj = this.reset2faForm.value;

    this.userService.Reset2FA(this.getId, obj).subscribe(
        (res) => {

          if(!res.status){
            this.showError = true;
            return ;
          }
          this.reset2faForm.reset();
          this.showSuccess = true;

        }
    );

  }

}
