import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoCatalog } from '../../models/co-catalog';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public classMenu: String;
  
   private urlAPI:string = 'http://10.89.49.10:8093/getComponents';

  constructor(private http: HttpClient) {  }

  getData(): Observable<CoCatalog[]>{
    return this.http.get<CoCatalog[]>(this.urlAPI);
    
  }
  openMenu() {
    if (this.classMenu === 'close_nav') {
      this.classMenu = 'open_nav';
    } else {
      this.classMenu = 'close_nav';
    }
  }
  openOnlyMenu() {
    this.classMenu = 'open_nav';
  }
  closeMenu() {
    this.classMenu = 'close_nav';
  }

  

}
