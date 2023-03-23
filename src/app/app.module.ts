import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SetupGoogleauthComponent } from './setup-googleauth/setup-googleauth.component';
import { OtpComponent } from './otp/otp.component';
import { ForgotGoogleauthComponent } from './forgot-googleauth/forgot-googleauth.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { Register2faComponent } from './register2fa/register2fa.component';
import { PrivateComponent } from './private/private.component';
import { LogoutComponent } from './logout/logout.component';
import { Reset2FAComponent } from './reset2-fa/reset2-fa.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SetupGoogleauthComponent,
    OtpComponent,
    ForgotGoogleauthComponent,
    RegisterComponent,
    Register2faComponent,
    PrivateComponent,
    LogoutComponent,
    Reset2FAComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'login' , component: LoginComponent },
      { path: 'verify', component: OtpComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register-2fa', component: Register2faComponent },
      { path: 'forgot-2fa', component: ForgotGoogleauthComponent },
      { path: 'reset-2fa/:id', component: Reset2FAComponent },
      { path: 'private', component: PrivateComponent },
      { path: 'otp', component: OtpComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '' , redirectTo: '/login' , pathMatch: 'full' }
    ]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
