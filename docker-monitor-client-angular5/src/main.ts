import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {initConfig} from './fetch-config';

if (environment.production) {
  enableProdMode();
}
initConfig(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
