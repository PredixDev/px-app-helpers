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
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../../@polymer/polymer/polymer-legacy.js';

import '../../../px-demo/px-demo-header.js';
import '../../../px-demo/px-demo-api-viewer.js';
import '../../../px-demo/px-demo-footer.js';
import '../../../px-demo/px-demo-configs.js';
import '../../../px-demo/px-demo-props.js';
import '../../../px-demo/px-demo-interactive.js';
import '../../../px-demo/px-demo-component-snippet.js';
import '../px-app-header.js';
import '../../../px-app-nav/px-app-nav.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style>
      px-demo-component {
        width: 100%;
        height: 400px;
      }
      iframe {
        width: 100%;
        height: 400px;
        border: none;
      }

    </style>

    <!-- Header -->
    <px-demo-header module-name="px-app-header" parent-name="px-app-helpers" description="The px-app-header component can be used as a wrapper for the px-app-nav. It provides a container that stays fixed to the top of the screen. By default, the branding bar will shrink to a minimized state as the user scrolls down the page, unless the &quot;fixed&quot; property is set." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Component ---------------------------------------------------------->
       <px-demo-component slot="px-demo-component">
         <iframe id="demoframe" src="[[importPath]]../demo.html"></iframe>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-app-header">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer api-source-file-path="px-app-helpers/px-app-helpers-api.json" source="px-app-header">
    </px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-app-header-demo',

  properties: {

    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "Default",
            configReset: true
          }
        ]
      }
    }
  },

  observers: [
    '_fixedChanged(props.fixed.value)'
  ],

  demoProps: {
    fixed:{
      type: Boolean,
      value: false,
      inputType: 'toggle'
    },
    lightDomContent: {
      type: String,
      defaultValue: '<px-app-nav slot="app-nav" items="..."></px-app-nav>'
    }
  },

  _fixedChanged: function(val){
    var appHeaderEl = this.$.demoframe.contentDocument.querySelector('px-app-header');
    if (appHeaderEl){
      appHeaderEl.fixed = val;
    }
  }
});
