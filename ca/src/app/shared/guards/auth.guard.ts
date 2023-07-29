import {inject} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

export const authGuard = () => {
  const authService = inject(UserService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  if (authService.isAdmin) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/auth/login');
};
