import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService,
      private router: Router,
      private alertify: AlertifyService,
      private authService: AuthService) { }

   resolve(route: ActivatedRouteSnapshot): Observable<User> {
     return this.userService.getUser(this.authService.decodedToken.nameid).catch(error => {
       console.log(this.authService.decodedToken);
       this.alertify.error('Problem data retriving');
       this.router.navigate(['/members']);
       return Observable.of(null);
     });
   }
}
