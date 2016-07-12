// Imports for loading & configuring the in-memory web api
import { XHRBackend } from '@angular/http';
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api';
import { InMemoryDataService } from './app/services/in-memory-data/in-memory-data.service';


import { bootstrap }    from '@angular/platform-browser-dynamic';
import {PLATFORM_DIRECTIVES, provide} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { APP_ROUTER_PROVIDERS } from './app/routes/app.routes';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent } from './app/components/app/app.component';




import './css/styles.css';
bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  { provide: XHRBackend, useClass: InMemoryBackendService }, // in-mem server
  { provide: SEED_DATA, useClass: InMemoryDataService },     // in-mem server data
  provide(PLATFORM_DIRECTIVES, {useValue: [ROUTER_DIRECTIVES], multi: true})
]);
