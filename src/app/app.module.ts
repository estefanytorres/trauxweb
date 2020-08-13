import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Providers
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { AuthService } from '../services/auth.service';

// WWW
import { WwwComponent } from './www/www.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { LivechatWidgetModule } from '@livechat/angular-widget';

// Home
import { HomeComponent } from './www/home/home.component';
import { BannerCarrouselComponent } from './www/home/banner-carrousel/banner-carrousel.component';
import { BannerOnesystemComponent } from './www/home/banner-onesystem/banner-onesystem.component';
import { BannerResultsComponent } from './www/home/banner-results/banner-results.component';
import { BannerTestimonialsComponent } from './www/home/banner-testimonials/banner-testimonials.component';
import { BannerConsultComponent } from './www/home/banner-consult/banner-consult.component';

// Product
import { ProductComponent } from './www/product/product.component';
import { BannerDemoComponent } from './www/product/banner-demo/banner-demo.component';
import { BannerProductComponent } from './www/product/banner-product/banner-product.component';
import { FormDownloadDemoComponent } from './www/product/form-download-demo/form-download-demo.component';

// Contact
import { ContactComponent } from './www/contact/contact.component';
import { FormContactUsComponent } from './www/contact/form-contact-us/form-contact-us.component';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';

// DashBoard
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboardhomecomponent } from './dashboard/home/dashboardhomecomponent';
import { ProcessfilesComponent } from './dashboard/services/processfiles/processfiles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ContactComponent,
    BannerCarrouselComponent,
    BannerOnesystemComponent,
    BannerResultsComponent,
    BannerTestimonialsComponent,
    BannerDemoComponent,
    BannerProductComponent,
    FormDownloadDemoComponent,
    FormContactUsComponent,
    BannerConsultComponent,
    PageNotFoundComponent,
    WwwComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    Dashboardhomecomponent,
    ProcessfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    LivechatWidgetModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
