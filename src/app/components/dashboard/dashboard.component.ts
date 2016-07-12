'use strict';

// 7. http

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero/hero.service';
import { OnInit } from '@angular/core';
import { Hero } from '../../models/hero';


@Component({
  selector: 'my-dashboard',
  template: require('./dashboard.component.html'),
  // require syntax enables us to keep a relative file path w/ no errors
  styles: [require('./dashboard.component.css')]
})

export class DashboardComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private router: Router, private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}


// // 6. routing part 2
//
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HeroService } from '../../services/hero/hero.service';
//
// // Imported for type defs only
// import { OnInit } from '@angular/core';
// import { Hero } from '../../models/hero';
//
// @Component({
//   selector: 'my-dashboard',
//   templateUrl: 'src/app/components/dashboard/dashboard.component.html',
//   // we're also going to add a styleUrls property
//   styleUrls: ['src/app/components/dashboard/dashboard.component.css']
// })
//
// export class DashboardComponent implements OnInit {
//   public heroes: Hero[] = [];
//
//   constructor(private router: Router, private heroService: HeroService) {}
//
//   ngOnInit() {
//     this.heroService.getHeroes()
//         .then(heroes => this.heroes = heroes.slice(1, 5));
//   }
//
//   gotoDetail(hero: Hero) {
//     // This is a link parameters array (LPA)
//     // and maps to the route '/detail/:id'
//     let link = ['/detail', hero.id];
//     this.router.navigate(link); // the navigate method on the router takes a LPA
//   }
// }
