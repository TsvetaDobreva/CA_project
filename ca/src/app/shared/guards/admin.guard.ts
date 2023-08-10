import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    public router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | boolean {
    return this.userService.isAdmin().pipe(
      map(data => {
        const currentRole = data.payload.data()['isAdmin'];
        if(!currentRole) {
          this.router.navigate(['/']);
        }
        return true;
      })
    )
  }
}
