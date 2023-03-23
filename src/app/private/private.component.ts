import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  email = "";
  
  constructor( private userService: UserService,
               private router: Router,
               private ngZone: NgZone
    ) { }

  ngOnInit(): void {

    this.userService.CheckLogin()
    .subscribe((res) => {

        if(!res.status){
          this.ngZone.run(() => this.router.navigateByUrl('/login'));
          return;
        }

        this.email = res.data.email;

      }, (err) => {
        console.log(err);
    });
  }

}
