'use strict';

// 7. http

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeroService } from '../../services/hero/hero.service';


@Component({
  selector:  `my-app`,
  directives: [ROUTER_DIRECTIVES],
  providers: [HeroService],
  template: require('./app.component.html'),
  // require syntax enables us to keep a relative file path w/ no errors
  styles: [require('./app.component.css')]
})

export class AppComponent {

  public title: String = 'Tour of Heroes';

}


// // 6. Routing part 2: Adding a dashboard and on
//
// import { Component } from '@angular/core';
// import { ROUTER_DIRECTIVES } from '@angular/router';
// import { HeroService } from '../../services/hero/hero.service';
//
// @Component({
//   selector:  `my-app`,
//   directives: [ROUTER_DIRECTIVES],
//   providers: [HeroService],
//   templateUrl: 'src/app/components/app/app.component.html',
//   // we're also going to add a styleUrls property
//   styleUrls: ['src/app/components/app/app.component.css']
// })
//
// export class AppComponent {
//
//   public title: String = 'Tour of Heroes';
//
// }


// // 6. Routing part 1
//
// import { Component } from '@angular/core';
// import { HeroService } from './hero.service';
// import { ROUTER_DIRECTIVES } from '@angular/router';
// //import { HeroesComponent } from './heroes.component';
//
// // we can remove this now
// // import Hero from './hero';
//
//
// @Component({
//   selector:  `my-app`,
//   directives: [ROUTER_DIRECTIVES],
//   // This is not included in the documentation, but shows up as a
//   // warning in the console, as it will be required for future versions of
//   // the router:
//   // http://stackoverflow.com/questions/38144547/in-angular2-rc4-how-do-i-add-components-to-the-precompile-array
//   // Update: this seemed to be worked out in the 3.0.0-beta2 version of the router
//   // precompile: [HeroesComponent],
//   providers: [HeroService],
//   template:
//     `<h1>{{title}}</h1>
//      <!-- notice the link parameters array assigned to the routerLink-->
//      <a [routerLink]="['/heroes']">Heroes</a>
//      <router-outlet></router-outlet>`
// })
//
// export class AppComponent {
//
//   public title: String = 'Tour of Heroes';
//
//   // This all has been moved down into the heroes.component.ts file
//   // as that component is handling the service we pass it now. The same thing
//   // can be said for the styles property on the component decorator object
//   //
//   // public heroes: Hero[];
//   // public selectedHero: Hero;
//
//   // constructor(private heroService: HeroService) {
//   //
//   // }
//   //
//   // ngOnInit() {
//   //   this.getHeroes();
//   // }
//   //
//   // getHeroes() {
//   //   //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
//   //   this.heroService.getHeroes().then(heroes => this.heroes = heroes);
//   // }
//
// }


// // 5. Services
//
// import { Component, OnInit } from '@angular/core';
// import HeroDetailComponent from './hero-detail.component';
// import { HeroService } from './hero.service';
// import Hero from './hero';
//
//
// @Component({
//   selector:  `my-app`,
//   directives: [HeroDetailComponent],
//   // The providers array tells Angular to create a fresh instance of
//   // the HeroService when it creates a new AppComponent.
//   // The AppComponent can use that service to get heroes and so can
//   // every child component of its component tree.
//   providers: [HeroService], // This is required when including a service in the component
//   template:
//     `<h1>{{title}}</h1>
//      <h2>My Heroes</h2>
//      <ul class="heroes">
//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
//          <span class="badge">{{hero.id}}</span> {{hero.name}}
//        </li>
//      </ul>
//      <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
//
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
// // your component class has to inherit from OnInit to use the hook
// export class AppComponent implements OnInit {
//
//   public title: String = 'Tour of Heroes';
//   public heroes: Hero[];
//   public selectedHero: Hero;
//
//   // The constructor will receive any services
//   // the component needs as private arguments
//   // DO NOT PUT COMPLEX LOGIC IN THE CONSTRUCTOR
//   constructor(private heroService: HeroService) {
//
//   }
//
//   // Anything in the ngOnInit method is ran at the beginning
//   // of the component lifecycle in order to initialize things
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

// 4. Multiple Components
//
// import { Component } from '@angular/core';
// import HeroDetailComponent from './hero-detail.component';
// import Hero from './hero';
//
//
// const HEROES: Hero[] = [
//   { id: 11, name: 'Mr. Nice' },
//   { id: 12, name: 'Narco' },
//   { id: 13, name: 'Bombasto' },
//   { id: 14, name: 'Celeritas' },
//   { id: 15, name: 'Magneta' },
//   { id: 16, name: 'RubberMan' },
//   { id: 17, name: 'Dynama' },
//   { id: 18, name: 'Dr IQ' },
//   { id: 19, name: 'Magma' },
//   { id: 20, name: 'Tornado' }
// ];
//
// @Component({
//   selector:  `my-app`,
//   directives: [HeroDetailComponent], // An array of Components used inside this one
//   template:
//     `<h1>{{title}}</h1>
//      <h2>My Heroes</h2>
//      <ul class="heroes">
//        <!-- *ngFor is a shortcut for the template element tag -->
//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
//          <span class="badge">{{hero.id}}</span> {{hero.name}}
//        </li>
//      </ul>
//      <my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
//
//   styles: // These styles are only applied to this component
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
//
// export class AppComponent {
//
//   public title: String = 'Tour of Heroes';
//   public heroes: Hero[] = HEROES;
//   public selectedHero: Hero;
//
//   public onSelect(hero: Hero) {
//     this.selectedHero = hero;
//   }
//
// }

// 3. Master/Detail
//
// import { Component } from '@angular/core';
//
// // This class is for the convenience of typescript type resolutions
// // Although the program will throw a lot of errors, it will
// // run without this
// export class Hero {
//   id: Number;
//   name: String;
// }
//
// const HEROES: Hero[] = [
//   { id: 11, name: 'Mr. Nice' },
//   { id: 12, name: 'Narco' },
//   { id: 13, name: 'Bombasto' },
//   { id: 14, name: 'Celeritas' },
//   { id: 15, name: 'Magneta' },
//   { id: 16, name: 'RubberMan' },
//   { id: 17, name: 'Dynama' },
//   { id: 18, name: 'Dr IQ' },
//   { id: 19, name: 'Magma' },
//   { id: 20, name: 'Tornado' }
// ];
//
//
// // Component is an es6 decorator:
// // https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841#.i8zo845dq
// // http://blog.developsuperpowers.com/eli5-ecmascript-7-decorators/
// // *ngFor is a shortcut for the HTML5 template element tag
// // and could be written as:
// // <template ngFor let-hero [ngForOf]="heroes">
// //   <span class="badge">{{hero.id}}</span> {{hero.name}}
// // </template>
//
// @Component({
//   selector:  `my-app`,
//   //templateUrl: `can/be/used/to/pull/template/from/separate/file`,
//   template:
//     `<h1>{{title}}</h1>
//      <h2>My Heroes</h2>
//      <ul class="heroes">
//        <!-- *ngFor is a shortcut for the template element tag -->
//        <li *ngFor="let hero of heroes" [class.selected]="hero === selectedHero" (click)="onSelect(hero)">
//          <span class="badge">{{hero.id}}</span> {{hero.name}}
//        </li>
//
//      </ul>
//      <div *ngIf="selectedHero">
//        <h2>{{ selectedHero.name }} details!</h2>
//        <div><label>id: </label>{{ selectedHero.id }}</div>
//        <div>
//          <label>name: </label>
//          <input [(ngModel)]="selectedHero.name" placeholder="name">
//        </div>
//      </div>`,
//
//   styles: // These styles are only applied to this component
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
// // This class is basically a controller decorated with
// // additional info to make it a component. In Angular 1, you can
// // achieve the same thing by assigning a directive it's own
// // privately scoped controller. In fact, you can still write
// // decorator style directive, they just don't have templates.
// // Public is a typescript syntax, like java's public, private, or protected
// // it's also a much shorter, declarative syntax for a constructor
// export class AppComponent {
//
//   public title: String = 'Tour of Heroes';
//   public heroes: Hero[] = HEROES;
//   public selectedHero: Hero;
//
//   public onSelect(hero: Hero) {
//     this.selectedHero = hero;
//   }
//
// }


// export class AppComponent {
//   // Without public, private, and protected syntax, we'd just define the type
//   // at the top of the class
//   title: String;
//   heroes: Hero[];
//   hero: Hero;
//
//   constructor() {
//     this.title = 'Tour of Heroes';
//     this.heroes = HEROES;
//     this.hero = {
//       id: 1,
//       name: 'Windstorm'
//     };
//   }
// }

// 2. The Hero Editor
//
// import { Component } from '@angular/core';
//
// export class Hero {
//   id: number;
//   name: string;
// }
//
// @Component({
//   selector:  `my-app`,
//   template:  `<h1>{{title}}</h1>
//               <h2>{{hero.name}} details!</h2>
//               <div><label>id: </label>{{hero.id}}</div>
//               <div>
//                 <label>name: </label>
//                 <input [(ngModel)]="hero.name" placeholder="name">
//               </div>`
// })
// export class AppComponent {
//   public title = 'Tour of Heroes';
//   public hero: Hero = {
//     id: 1,
//     name: 'Windstorm'
//   };
// }



// export class AppComponent {
//   title = 'Tour of Heroes';
//   hero = 'Windstorm';
// }
