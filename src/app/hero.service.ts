import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

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
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log(`fetched heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesUrl}/${id}`).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id} name=${newHero.name}`)),
      catchError(this.handleError<Hero>(`addHero`))
    )
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    return this.http.delete<Hero>(`${this.heroesUrl}/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) return of([]);
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching ${term}`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (err: Error) => {
      this.log(`Operation: ${operation} failed.Error: ${err.message}`);
      return of(result as T);
    };
  }
}
