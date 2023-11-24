import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { servicesContainer } from './app.container';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../../usecases/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NewsEffects } from '../../usecases/News/news-store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot(rootReducer),
      EffectsModule.forRoot(NewsEffects),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: !isDevMode(), // Restrict extension to log-only mode
        autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        connectOutsideZone: true, // If set to true, the connection is established outside the Angular zone for better performance
      })
    ),
    ...servicesContainer,
  ],
};
