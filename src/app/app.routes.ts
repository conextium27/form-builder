import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BuildComponent } from './components/build/build.component';

const appRoutes: Routes = [
    { path: 'index', component: HomeComponent },
    { path: 'login' , component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'build', component: BuildComponent},

    { path: '**', pathMatch: 'full', redirectTo: 'index' }
];

export const routing = RouterModule.forRoot(appRoutes);