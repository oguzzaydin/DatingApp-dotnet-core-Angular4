import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() user: User;
  constructor(private authService: AuthService,
     private userService: UserService, private alertifService: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertifService.success('You have liked :' + this.user.knownAs);
    }, error => {
      this.alertifService.error(error);
    });
  }
}
