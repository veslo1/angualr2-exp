
/**
 * Copyright 2016, Wilsonic..
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree. 
 *
 */

import {
  Component, provide
} from 'angular2/core';

import { bootstrap } from 'angular2/platform/browser';

import {HTTP_PROVIDERS, BrowserXhr} from 'angular2/http';

/*
 * Components
 */
import {NavBarBasic} from './components/NavBarComponent';
import {ArtistList} from './components/ArtistListComponent';

/*
 * Injectables
 */
import { servicesInjectables } from './services/services';
import {utilInjectables} from './util/util';




/*
*  Customized XHR repsonse to override
*/


import {CustomBrowserXhr} from './util/custom.xhr';

/*
 * Services
 */
import {
  ArtistService
} from './services/services';

import {
   BINARYLOAD_PROVIDERS
} from './services/BinaryLoadService';

import {BinaryLoadExampleData} from './BinaryLoadExampleData';

/*
 * Webpack
 */
require('../css/styles.scss');

@Component({
  selector: 'harness',
  directives: [NavBarBasic, ArtistList],
  template: `
          <div>
            <nav-bar-basic></nav-bar-basic>
            <div class="container">
              <artist-list></artist-list>
            </div>
          </div>
          `
})
class  Harness {
  constructor(public artistService: ArtistService) {
    BinaryLoadExampleData.init(artistService);

  }
}

bootstrap(Harness, [ servicesInjectables,
                     HTTP_PROVIDERS,
                     BINARYLOAD_PROVIDERS,
                     utilInjectables,
                     provide(BrowserXhr, { useClass: CustomBrowserXhr })
                    ]);

require('./services/services');
require('./BinaryLoadExampleData');
require('./util/util');
require('./components/NavBarComponent');