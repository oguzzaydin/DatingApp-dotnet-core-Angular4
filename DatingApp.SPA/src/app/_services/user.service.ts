import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../_models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: Http) { }

getUsers(): Observable<User[]> {
  return this.http
  .get(this.baseUrl + 'users')
  .map(response => <User[]>response.json())
  .catch(this.handleError);
}

getUser(id): Observable<User> {
  return this.http
   .get(this.baseUrl + 'users/' + id)
   .map(response => <User>response.json())
   .catch(this.handleError);
}

private handleError(error: any) {
  const applicationError = error.headers.get('Application-Error');
  if (applicationError) {
    return Observable.throw(applicationError);
  }
  const serverError = error.json();
  let modelStateErrors = '';
  if (serverError) {
    for (const key in serverError) {
      if (serverError[key]) {
        modelStateErrors += serverError[key] + '\n';
      }
    }
  }
  return Observable.throw(
    modelStateErrors || 'Server Error'
  );
}

}
