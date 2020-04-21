import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutsModule } from './layouts';
import { CommonLayoutComponent } from './layouts/common-layout';
import { ChartsComponent } from './pages/charts';
import { ComponentsComponent } from './pages/components';
import { DashboardComponent } from './pages/dashboard';
import { Dashboard2Component } from './pages/dashboard2';
import { FormsComponent } from './pages/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';
import { ListAdminsComponent } from './pages/list-admins/list-admins.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },
        { path: 'app', component: CommonLayoutComponent, children: [
          { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
          { path: 'dashboard-custom', component: Dashboard2Component, pathMatch: 'full' },
          { path: 'forms', component: FormsComponent, pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
          { path: 'register-employee', component: RegisterEmployeeComponent, pathMatch: 'full' },
          { path: 'list-admins', component: ListAdminsComponent, pathMatch: 'full' },
          { path: 'list-users', component: ListUsersComponent, pathMatch: 'full' },
          { path: 'charts', component: ChartsComponent, pathMatch: 'full' },
          { path: 'components', component: ComponentsComponent, pathMatch: 'full' },
          { path: '**', redirectTo: '/pages/404' },
        ] }, // add 'canActivate: AuthGuard' for catching unauth users
        { path: 'ui', loadChildren: './pages/ui/ui.module#UIModule' },
        { path: 'maps', loadChildren: './pages/maps/maps.module#MapsModule' },
        { path: 'pages', loadChildren: './pages/pages/pages.module#PagesModule' },
        { path: '**', redirectTo: '/pages/404' },
      ],
      { useHash: true },
    ),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
