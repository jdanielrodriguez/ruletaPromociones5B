import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MiComponente } from './components/mi-componente/mi-componente.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { HomeComponent } from './components/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';
import { WinnerComponent } from './components/winner/winner.component';
import { CondicionesComponent } from './components/condiciones/condiciones.component';

import { PlayServiceService } from './services/play-service.service';

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
  ],
  imports: [
    BrowserModule,
    routing,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders,
    PlayServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
