import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingProviders, routing } from './app.routing';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { CondicionesComponent } from './components/condiciones/condiciones.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';

import { GraciasComponent } from './components/gracias/gracias.component';
import { PlayService } from './services/play-service.service';
import { ImageComponent } from './components/image/image.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { BlockUIModule } from 'ng-block-ui';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormularioComponent,
    RuletaComponent,
    CondicionesComponent,
    GraciasComponent,
    ImageComponent,
    LoginComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BlockUIModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    CarouselModule
  ],
  providers: [
    appRoutingProviders,
    PlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
