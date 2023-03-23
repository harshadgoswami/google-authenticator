import { Component, OnInit,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  
  showError = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {

    this.userService.Logout()
    .subscribe((res) => {

        if(!res.status){
          this.showError = true;
          return;
        }
        localStorage.removeItem('token');
        this.ngZone.run(() => this.router.navigateByUrl('/login'));

      }, (err) => {
        console.log(err);
    });
  }

}
