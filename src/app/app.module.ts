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
import { FormsModule as Forms} from './pages/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ThemeModule } from 'theme';
import { MaterialAngularSelectModule } from 'material-angular-select';
import { RegisterEmployeeComponent } from './pages/register-employee/register-employee.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListAdminsComponent } from './pages/list-admins/list-admins.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { RefundRequestsComponent } from './pages/refund-requests/refund-requests.component';
import { CustomersQuestionsComponent } from './pages/customers-questions/customers-questions.component';
import { CustomersAnswerComponent } from './pages/customers-answer/customers-answer.component';
import { NgxPrettyDateModule } from 'ngx-pretty-date';

import { CookieService } from 'ngx-cookie-service';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ToastrModule } from 'ngx-toastr';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';

@NgModule({
  declarations: [AppComponent, ProfileComponent, RegisterEmployeeComponent, ListAdminsComponent, ListUsersComponent, TransactionsComponent, SubscriptionsComponent, RefundRequestsComponent, CustomersQuestionsComponent, CustomersAnswerComponent, StatisticsComponent,CreateProductComponent, ProductsListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    DashboardModule,
    Dashboard2Module,
   
    Forms,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ThemeModule,
    MaterialAngularSelectModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar:true,
      progressAnimation:"increasing",
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
    
    HttpClientModule,
    NgxPrettyDateModule,
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
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
