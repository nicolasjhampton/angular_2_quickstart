'use strict';

// 7. http

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../services/hero/hero.service';
import { Hero } from '../../models/hero';

//

@Component({
  selector:  `my-heroes`,
  template: require('./heroes.component.html'),
  // require syntax enables us to keep a relative file path w/ no errors
  styles: [require('./heroes.component.css')],
  // reintegrating the details component again to add new heroes
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {

  public error: any;
  public heroes: Hero[];
  public addingHero: Boolean;
  public selectedHero: Hero;

  constructor(private router: Router,
              private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  gotoDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          // removes the deleted hero from our displayed hero list
          // without making an additional request to the server
          this.heroes = this.heroes.filter(h => h !== hero);
          // Resets the selectedHero if it's the one we've deleted
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error);
  }

}


// // 6. Routing part 2
//
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
// import { HeroService } from '../../services/hero/hero.service';
// import { Hero } from '../../models/hero';
//
//
// @Component({
//   selector:  `my-heroes`,
//   // we remove the directives property because we navigate to it, instead
//   // of including it as a child component
//   // directives: [HeroDetailComponent],
//   // replacing or template property with a templateUrl,
//   // keeping our component object clean and modular.
//   // Doing similar for the css styles
//   templateUrl: 'src/app/components/heroes/heroes.component.html',
//   // The styleUrls takes an array of stylesheets
//   styleUrls: ['src/app/components/heroes/heroes.component.css']
// })
//
// export class HeroesComponent implements OnInit {
//
//   public heroes: Hero[];
//   public selectedHero: Hero;
//
//   constructor(private router: Router, private heroService: HeroService) {
//
//   }
//
//   ngOnInit() {
//     this.getHeroes();
//   }
//
//   getHeroes() {
//     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
//   }
//
//   onSelect(hero: Hero) {
//     this.selectedHero = hero;
//   }
//
//   // New method to handle navigating to the details
//   gotoDetail() {
//     this.router.navigate(['/detail', this.selectedHero.id]);
//   }
//
// }

// // 6. Routing part 1
//
// import { Component, OnInit } from '@angular/core';
// import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
// import { HeroService } from '../../services/hero/hero.service';
// import { Hero } from '../../models/hero';
//
//
// @Component({
//   selector:  `my-heroes`,
//   directives: [HeroDetailComponent],
//   // When we moved this code from the app.component to heroes.component,
//   // this component receives the heroes from the parent component instead
//   // of directly from the service.
//   // providers: [HeroService],
//   template:
//     `<h2>My Heroes</h2>
//      <ul class="heroes">
//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
//          <span class="badge">{{hero.id}}</span> {{hero.name}}
//        </li>
//      </ul>
//      <!-- So why are we controlling this hero from a parent
//      component? Simple. Because our click actions that decide
//      what this hero is are controlled by the parent, not the
//      child component-->
//      <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
//   styles:
//     [`
//       .selected {
//         background-color: #CFD8DC !important;
//         color: white;
//       }
//       .heroes {
//         margin: 0 0 2em 0;
//         list-style-type: none;
//         padding: 0;
//         width: 15em;
//       }
//       .heroes li {
//         cursor: pointer;
//         position: relative;
//         left: 0;
//         background-color: #EEE;
//         margin: .5em;
//         padding: .3em 0;
//         height: 1.6em;
//         border-radius: 4px;
//       }
//       .heroes li.selected:hover {
//         background-color: #BBD8DC !important;
//         color: white;
//       }
//       .heroes li:hover {
//         color: #607D8B;
//         background-color: #DDD;
//         left: .1em;
//       }
//       .heroes .text {
//         position: relative;
//         top: -3px;
//       }
//       .heroes .badge {
//         display: inline-block;
//         font-size: small;
//         color: white;
//         padding: 0.8em 0.7em 0 0.7em;
//         background-color: #607D8B;
//         line-height: 1em;
//         position: relative;
//         left: -1px;
//         top: -4px;
//         height: 1.8em;
//         margin-right: .8em;
//         border-radius: 4px 0 0 4px;
//       }
//     `]
//
// })
//
// export class HeroesComponent implements OnInit {
//
//   public heroes: Hero[];
//   public selectedHero: Hero;
//
//   // What might seem strange about this is that instead
//   // of handling the service in the appComponent and
//   // passing the array into the heroesComponent with a
//   // bracket bind, like we did with the details, we
//   // instead passed the service down. From what I can
//   // tell, we're doing this to avoid app-wide information,
//   // like we used to have in Angular 1 and the "app
//   // controller"
//   constructor(private heroService: HeroService) {
//
//   }
//
//   ngOnInit() {
//     this.getHeroes();
//   }
//
//   getHeroes() {
//     //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
//     this.heroService.getHeroes().then(heroes => this.heroes = heroes);
//   }
//
//   onSelect(hero: Hero) {
//     this.selectedHero = hero;
//   }
//
// }
