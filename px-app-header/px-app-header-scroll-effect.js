/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../@polymer/polymer/polymer-legacy.js';

import '../../@polymer/app-layout/app-scroll-effects/app-scroll-effects-behavior.js';
import { registerEffect } from '../../@polymer/app-layout/helpers/helpers.js';
import { dom } from '../../@polymer/polymer/lib/legacy/polymer.dom.js';
registerEffect('px-app-header-scroll-effect', {
  setUp: function(config) {
    // the effect's config is passed to the setUp.
    this.navContainer = { navElement: dom(this).querySelector('[nav-container]') };
    this.navContainer.navHeight = parseInt(getComputedStyle(this.navContainer.navElement).height, 10);
    this.navContainer.navElement.style.willChange = 'transform';
    this.headerContainer = { headerElement: dom(this).querySelector('[header-container]') };
    this.headerContainer.headerHeight = parseInt(getComputedStyle(this.headerContainer.headerElement).height, 10);
    this.condensedHeaderSize = (this.headerContainer.headerHeight >= 5 ? 5 : 0);
  },

  run: function(progress) {
    let dy = ((this.navContainer.navHeight - this.headerContainer.headerHeight + this.condensedHeaderSize) * progress);
    this.transform(`translateY(${dy}px)`, this.navContainer.navElement);
    if(progress === 0){
      this.dispatchEvent(new CustomEvent('px-app-header-scroll-reset'));
    }
  },

  tearDown: function() {
     // clean up and reset of states
     this.navContainer.navElement.style.willChange = "auto";
     delete this.navContainer;
     delete this.headerContainer;

  }
});
