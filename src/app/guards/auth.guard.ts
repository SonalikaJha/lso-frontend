import { Injectable } from '@angular/core';
import { CanActivate, Route, Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
      if (localStorage.getItem('userData')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
