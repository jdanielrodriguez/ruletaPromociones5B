import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingProviders, routing } from './app.routing';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { CondicionesComponent } from './components/condiciones/condiciones.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { HomeComponent } from './components/home/home.component';
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';
import { WinnerComponent } from './components/winner/winner.component';

import { GraciasComponent } from './components/gracias/gracias.component';
import { PlayService } from './services/play-service.service';

@NgModule({
  declarations: [
    AppComponent,
    MiComponente,
    PeliculasComponent,
    HomeComponent,
    FormularioComponent,
    RuletaComponent,
    WinnerComponent,
    CondicionesComponent,
    GraciasComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule
  ],
  providers: [
    appRoutingProviders,
    PlayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
