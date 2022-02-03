import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    protected readonly router: Router,
    private tokenService: TokenStorageService,
  ) {
    
  }
  
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
      let isLoggedIn = true 

    if (this.tokenService.getUser() !== null) {
      isLoggedIn = false
      this.router.navigateByUrl("/login")
    }

    return isLoggedIn;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    // let isLoggedIn = false 

    if (!this.tokenService.isLoggedIn()) {
      window.location.replace("/login")
      // this.router.navigateByUrl("/login")
    }

    return this.tokenService.isLoggedIn()
  }
}
