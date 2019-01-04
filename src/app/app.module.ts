import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { Build2Component } from './components/build2/build2.component';
import { BuildComponent } from './components/build/build.component';
import { HeroService } from './components/services/hero.service';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { PanelsurveyComponent } from './components/panelsurvey/panelsurvey.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    Build2Component,
    BuildComponent,
    PanelsurveyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
