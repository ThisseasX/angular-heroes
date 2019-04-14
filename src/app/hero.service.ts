import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { delay, tap, first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl: string = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(tap(_ => this.log(`fetched heroes`)))
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
      map(heroes => heroes.find((hero => hero.id === id))),
      tap(_ => this.log(`fetched hero id=${id}`))
      )
  }

  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
