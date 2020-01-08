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
import '../px-app-route.js';
import { Polymer } from '../../../@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style></style>

    <!-- Header -->
    <px-demo-header module-name="px-app-route" description="The px-app-route component supports easy binding between various Predix UI components and a web application's URL. It helps keep UI state in sync with the URL, allowing users to bookmark or share views by copying their URL." parent-name="px-app-helpers" mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- API Viewer -->
    <px-demo-api-viewer api-source-file-path="px-app-helpers/px-app-helpers-api.json" source="px-app-route">
    </px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-app-route-demo'
});
