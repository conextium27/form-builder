import { Component } from '@angular/core';
import { HeroService } from './components/services/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'buildForm';

  public constructor(
    private heroService: HeroService) { }
}
