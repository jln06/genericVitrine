import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          // data: {
          //   authorities: [Authority.ADMIN],
          // },
          // canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: 'inscription',
          loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionModule),
        },
        {
          path: '',
          loadChildren: () => import(`./entities/entity-routing.module`).then(m => m.EntityRoutingModule),
        },
        {
          path: 'gallerie',
          loadChildren: () => import('./gallerie/gallerie.module').then(m => m.GallerieModule),
        },
        navbarRoute,
        ...errorRoute,
      ],
      {
        enableTracing: DEBUG_INFO_ENABLED,
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
