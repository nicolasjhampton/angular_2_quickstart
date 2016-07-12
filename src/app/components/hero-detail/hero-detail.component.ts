'use strict';

// 7. http

//import { Component, OnInit, OnDestroy } from '@angular/core';
// we're adding some imports to handle http data communications
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../services/hero/hero.service';
import { Hero } from '../../models/hero';

@Component({
  selector: 'my-hero-detail',
  template: require('./hero-detail.component.html'),
  // require syntax enables us to keep a relative file path w/ no errors
  styles: [require('./hero-detail.component.css')]
})

export class HeroDetailComponent implements OnInit, OnDestroy {

  // we're adding the input decorator back, to reintergrate it
  // into the heroes list
  @Input()
  public hero: Hero;

  @Output()
  public close = new EventEmitter();

  public sub: any;
  public error: any;
  public navigated = false;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
          .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedHero: Hero = null) {
    // Need more information on this
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }

}


// // 6. Routing part 2
//
// // We won't need our Input decorator anymore, since we'll
// // receive infomation directly from the service, not bracket notation
// // on the parent component
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// // We're going to get the heroes direct from the service now,
// // decoupling the details component from the heroes component
// import { HeroService } from '../../services/hero/hero.service';
// import { Hero } from '../../models/hero';
//
// @Component({
//   selector: 'my-hero-detail',
//   // replacing or template property with a templateUrl,
//   // keeping our component object clean and modular
//   templateUrl: 'src/app/components/hero-detail/hero-detail.component.html',
//   // we're also going to add a styleUrls property
//   styleUrls: ['src/app/components/hero-detail/hero-detail.component.css']
// })
//
// // Adding these lifecycle hooks for the class to override
// export class HeroDetailComponent implements OnInit, OnDestroy {
//   // decorator removed
//   //@Input()
//   public hero: Hero;
//   public sub: any;
//
//   // We're creating a constructor function here for almost the sole
//   // purpose of receiving injected dependancies as parameters
//   constructor(private heroService: HeroService, private route: ActivatedRoute) {
//
//   }
//
//   // Just like in the heroes component, we use ngOnInit to retrieve
//   // service data, avoiding complex logic in the constructor
//   ngOnInit() {
//     // the params object on the route is an Observable,
//     // so we subscribe to it, the callback being what we
//     // do to params (think event array) when the event is triggered
//     this.sub = this.route.params.subscribe(params => {
//       console.log(params['id']);
//       console.log(+params['id']);
//       // Route parameters are always strings, so we're using
//       // type coersion to convert the string into a number with
//       // the (+) operator
//       let id = +params['id'];
//       this.heroService.getHero(id)
//         .then(hero => this.hero = hero);
//     });
//   }
//
//   // Disconnects the Observable stream we're listening to for data events
//   ngOnDestroy() {
//     this.sub.unsubscribe();
//   }
//
//   // Back button: notice we have automatic access to the window object
//   goBack() {
//     window.history.back();
//   }
//
//
// }

// // 4. Multiple Components
//
// import { Component, Input } from '@angular/core';
// import Hero from './hero';
//
//
// // We took this template from the template in
// // app.component.ts
// @Component({
//   selector: 'my-hero-detail',
//   template: `<div *ngIf="hero">
//                <h2>{{ hero.name }} details!</h2>
//                <div><label>id: </label>{{ hero.id }}</div>
//                <div>
//                  <label>name: </label>
//                  <input [(ngModel)]="hero.name" placeholder="name">
//                </div>
//              </div>`
//
// })  // Remember that we CANT have a semicolon here. The decorator has to have
//     // an unblocked path to the Component class it's decorating
//
// export class HeroDetailComponent {
//   // Needed for properties brought in through
//   // bracket notation on the component
//   @Input()
//   public hero: Hero;
// }
