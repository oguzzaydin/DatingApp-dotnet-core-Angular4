import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
   pageSize = 5;
   pageNumber = 1;
   likesParam = 'Likers';

    constructor(private userService: UserService,
      private router: Router, private alertify: AlertifyService) { }

   resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
     return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).catch(error => {
       this.alertify.error('Problem data retriving');
       this.router.navigate(['/members']);
       return Observable.of(null);
     });
   }
}
