import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES).pipe(delay(200), tap(_ => this.messageService.add('HeroService: fetched heroes')));
  }

  getHero(id: number): Observable<Hero> {
    return of(HEROES.find(hero => hero.id === id))
      .pipe(
      delay(200),
      tap(_ => this.messageService.add(`HeroService: fetched hero id=${id}`))
      );
  }
}
