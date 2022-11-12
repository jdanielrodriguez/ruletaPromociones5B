//importar los moulo del router de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar componentes a las cuales les quiero hacer una pagina exclusiva
import { HomeComponent } from './components/home/home.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { RuletaComponent } from './components/ruleta/ruleta.component';
import { WinnerComponent } from './components/winner/winner.component';
import { CondicionesComponent } from './components/condiciones/condiciones.component';

//Array de rutas
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: FormularioComponent },
  { path: 'ruleta/:move_id', component: RuletaComponent },
  { path: 'ganador', component: WinnerComponent },
  { path: 'condiciones', component: CondicionesComponent }
];

// exportar el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', useHash: true });
