v2.1.7
===================
px-app-asset changes:
* Add `_routeIsDifferent()` function to activatable behavior
* Add activate tests, copied 1-for-1 from selected tests
* Port changed code from selected behavior back to activatable behavior to fix
  race condition where asset graph was ready earlier than expected


v2.1.6
===================
px-app-header changes:
* Fix app header demo.

v2.1.5
===================
px-app-asset changes:
* Fix null argument behavior for px-app-asset-graph `removeChildren()` method

v2.1.4
===================
px-app-asset changes:
* fix typing of properties when multi-select and multi-activate change

v2.1.3
===================
px-app-asset changes:
* Fix property set order bug in px-app-asset-selectable behavior
px-app-route changes:
* Update tests to fix timing issues in Firefox

v2.1.2
===================
px-app-route changes:
* Fix px-app-route bugs impacting Polymer 2 apps

v2.1.1
===================
px-app-asset changes:
* Clear out `favorited` array if items is re-assigned to a new object

v2.1.0
===================
px-app-asset changes:
* Adds `PxAppAssetFavoritable` behavior. Works similarly to the selectable and
  activatable behaviors but holds a list of currently favorited items.

v2.0.2
===================
* Use custom routes to sync selected <> selectedRoute in px-app-asset Selectable
  and Activatable behaviors

v2.0.1
===================
* Undefined check in listener

v2.0.0
===================
* Polymer 1.x/2.x hybrid support

v1.4.3
===================
* add device flags, fix mobile demo

v1.4.2
===================
* Fix background colour of demo navbar.

v1.4.1
===================
* Add babel helpers to px-app-header demo file as loaded via iframe in predix-ui.com site

v1.4.0
===================
px-app-asset changes:
* Adds `isSelectable` configuration for items. Defaults to `true`.  If `false`
  the item can only be activated to view its children, not selected.

v1.3.4
===================
* fix typos in documentation

v1.3.3
===================
* fix up demo height for px-app-header.

v1.3.2
===================
* update px-app-header docs

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
