v1.3.1
===================
px-app-asset changes:
* Add `_assetGraph` to property so it causes property effects in template
  data binding

v1.3.0
===================
* Adds Object.assign polyfill in a seperate folder for use in multiple
  components

v1.2.2
===================
px-app-asset changes:
* Makes key changes dynamic
* Resets asset graph when keys reference changes
* Resets asset graph when keys.children changes
* Deselects/deactivates when keys or keys.id changes
* Adds tests to cover 

v1.2.1
===================
* Fix API source path for demos

v1.2.0
==================
px-app-asset changes:
* Fixes inconsistencies when `items` was re-assigned. Now a new asset graph will
  be re-drawn and the `px-app-asset-graph-created` event will be fired.
* Improves behavior of `addChildren()` method to be more consistent
* Adds `removeChildren()` method with the opposite functionality of `addChildren()`
* Adds new information to `px-app-asset-children-updated` event: when children
  are added the `evt.detail.added` property will contain an array with the
  new children; when children are removed the `evt.detail.removed` property will
  contain the removed children
* Adds functionality to deselect/deactivate the currently selected/active items
  if they are in the path of a removed item. The graph will reset its selected
  and/or active to the root (null) in this case.

v1.1.4
==================
* remove index-dark-theme
* update README

v1.1.3
==================
* update demo to use unique name

v1.1.2
==================
* Fix bug in selectable > `_updateSelectedRoute`, made if check handle arrays
* Fix graph build to pass dynamic childkey down

v1.1.1
==================
* Update demos

v1.1.0
==================
* Adds the px-app-route component to help with binding an app's state to the URL
  using Predix Design System components

v1.0.3
==================
* Removed enableWarnings property

v1.0.2
==================
* Update `keys` property in px-app-helpers to include label

v1.0.1
==================
* Fixing px-app-header demos.

v1.0.0
==================
* Initial release
* Add `px-app-asset` behaviors.
* Add `px-app-header` control for page layout with branding bar and app nav element.
