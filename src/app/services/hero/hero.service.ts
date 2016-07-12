'use strict';

// 7. http

import { Injectable } from '@angular/core';

// RxJS is being used for the observable methods we need
import 'rxjs/add/operator/toPromise';
import { Hero } from '../../models/hero';
import { Headers, Http } from '@angular/http';

// We're replacing this mock data with our http request
//import { HEROES } from '../../mocks/mock-heroes';

@Injectable()
export class HeroService {

  private heroesUrl = 'app/heroes';

  constructor(private http: Http) {}

  // We've rewritten getHeroes to use http
  getHeroes(): Promise<Hero[]> {
    // We're going to receive an observable, then convert it to a promise
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }

  // getHeroes() {
  //    return new Promise<Hero[]>(resolve =>
  //      setTimeout(() => resolve(HEROES), 2000)
  //    );
  // }

  getHero(id: number) {
    return this.getHeroes().then(heroes =>
      heroes.find(hero => hero.id === id)
    );
  }

  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }

  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }

  // Add new Hero
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http
               .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(res => res.json().data)
               .catch(this.handleError);
  }

  // Update existing Hero
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let url = `${this.heroesUrl}/${hero.id}`;

    return this.http
               .put(url, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  // Handles any http response error: doesn't need to be public method
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

// // 5. Services
//
// import { Injectable } from '@angular/core';
// import Hero from './hero';
// import { HEROES } from './mock-heroes';
//
// // Injectable is the decorator for services
// // Always remember the parentheses for this decorator
// @Injectable()
// export class HeroService {
//
//
//   // getHeroesSlowly() {
//   //   return new Promise<Hero[]>(resolve =>
//   //     setTimeout(() => resolve(HEROES), 2000) // 2 seconds
//   //   );
//   // }
//
//   getHeroes() {
//     return Promise.resolve(HEROES);
//   }
// }
