import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthInterceptor, AuthService, FakeBackendInterceptor } from '@services/*';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from './pages/charts';
import { ComponentsModule } from './pages/components';
import { DashboardModule } from './pages/dashboard';
import { Dashboard2Module } from './pages/dashboard2';
import { FormsModule } from './pages/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ThemeModule } from 'theme';
import { MaterialAngularSelectModule } from 'material-angular-select';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';

@NgModule({
  declarations: [AppComponent, ProfileComponent, RegisterEmployeeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    DashboardModule,
    Dashboard2Module,
    
    FormsModule,
    ChartsModule,
    ThemeModule,
    MaterialAngularSelectModule,
    
    HttpClientModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
