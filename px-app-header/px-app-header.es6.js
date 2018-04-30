/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
  Polymer({
    is: 'px-app-header',
    properties: {
      /**
       * By default, the branding bar within the app header container will minimize as the user scrolls away.
       * If this property is set, the branding bar will stay fixed as the user scrolls away.
       */
      fixed:{
        type: Boolean,
        value: false,
        observer: '_fixedChanged'
      },
      _condenses:{
        type: Boolean,
        value: true
      },
      _scrollEffect:{
        type: String,
        value: 'px-app-header-scroll-effect'
      }
    },
    ready(){
      Polymer.dom(this.root).querySelector('app-header').addEventListener('px-app-header-scroll-reset', evt => {
        this._setHeaderFixedState();
      });
    },
    _setHeaderFixedState(){
      this._condenses = !this.fixed;
      (this.fixed ? this._scrollEffect = '' : this._scrollEffect = 'px-app-header-scroll-effect');
    },
    _fixedChanged(){
      if (!Polymer.dom(this.root).querySelector('app-header').willCondense()){
        this._setHeaderFixedState();
      }
    }
  });
})();
