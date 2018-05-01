import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {

    constructor(private userService: UserService,
      private router: Router, private alertify: AlertifyService) { }

   resolve(route: ActivatedRouteSnapshot): Observable<User> {
     return this.userService.getUser(route.params['id']).catch(error => {
       this.alertify.error('Problem data retriving');
       this.router.navigate(['/members']);
       return Observable.of(null);
     });
   }
}
