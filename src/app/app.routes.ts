import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Build2Component } from './components/build2/build2.component';
import { BuildComponent } from './components/build/build.component';
import { PanelsurveyComponent } from './components/panelsurvey/panelsurvey.component';

const appRoutes: Routes = [
    { path: 'index', component: HomeComponent },
    { path: 'login' , component: LoginComponent},
    { 
        path: 'build2',
        component: Build2Component
    },
    { path: 'build', component: BuildComponent},
    { path: 'panel', component: PanelsurveyComponent},

    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

export const routing = RouterModule.forRoot(appRoutes);