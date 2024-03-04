import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loggedinString: string | null = localStorage.getItem("loggedin");
  let isLoggedin = false;
  if (loggedinString) {
    isLoggedin = JSON.parse(loggedinString);
  }
  if (!isLoggedin) {
    router.navigate(["/login"]);
    return false;
  }
  return isLoggedin;
};