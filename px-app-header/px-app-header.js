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
    Relative paths assume component is being run from inside an app or another component, where dependencies are flat
    siblings. When this component is run from its own repo (e.g. tests, examples), we assume the server is started with
    'gulp serve' (or similar server setup) to enable correct finding of bower dependencies for local runs.
*/
/**
### Usage

    <px-app-header>
      <px-app-nav slot="app-nav" items="..."></px-app-nav>
    </px-app-header>

The default configuration will contain a px-branding-bar that will inherit the `title` attribute from your application.
To override the title, use the branding-bar slot instead:

    <px-app-header>
      <px-branding-bar slot="branding-bar" application-title="..."></px-branding-bar>
      <px-app-nav slot="app-nav" items="..."></px-app-nav>
    </px-app-header>

@element px-app-header
@blurb A component combining a branding bar element and nav element header with scroll region & effect.
@homepage index.html
@demo index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../@polymer/polymer/polymer-legacy.js';

import '../../px-branding-bar/px-branding-bar.js';
import './css/px-app-header-styles.js';
import '../../@polymer/app-layout/app-header/app-header.js';
import '../../@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../@polymer/app-layout/app-header-layout/app-header-layout.js';
import './px-app-header-scroll-effect.js';
import { Polymer } from '../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '../../@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-app-header-styles"></style>
    <app-header-layout fullbleed="">
      <app-header slot="header" fixed="" condenses="[[_condenses]]" effects="[[_scrollEffect]]">
        <div header-container="" sticky="">
          <slot name="branding-bar">
            <px-branding-bar></px-branding-bar>
          </slot>
        </div>
        <div nav-container="">
          <slot name="app-nav"></slot>
        </div>
      </app-header>
      <slot></slot>
    </app-header-layout>
`,

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
    dom(this.root).querySelector('app-header').addEventListener('px-app-header-scroll-reset', evt => {
      this._setHeaderFixedState();
    });
  },

  _setHeaderFixedState(){
    this._condenses = !this.fixed;
    (this.fixed ? this._scrollEffect = '' : this._scrollEffect = 'px-app-header-scroll-effect');
  },

  _fixedChanged(){
    if (!dom(this.root).querySelector('app-header').willCondense()){
      this._setHeaderFixedState();
    }
  }
});
