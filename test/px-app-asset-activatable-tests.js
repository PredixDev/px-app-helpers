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

describe('PxAppBehavior.AssetActivatable', function () {
  var sandbox;
  var fx;
  var data = [
    {
      label: 'United States',
      id: 'united-states',
      children: [
        {
          label: 'California',
          id: 'calif',
          children: [
            {
              label: 'San Francisco',
              id: 'sf'
            },
            {
              label: 'Walnut Creek',
              id: 'wc'
            },
            {
              label: 'Sacramento',
              id: 'sc'
            }
          ]
        },
        {
          label: 'Arizona',
          id: 'ariz'
        },
        {
          label: 'Oregon',
          id: 'oregon'
        },
        {
          label: 'Washington',
          id: 'wash'
        }
      ]
    },
  ];
  var customKeys = {
    id: 'assetId',
    label: 'assetName',
    children: 'assetChildren'
  };
  var customKeysData = [
    {
      assetName: 'United States',
      assetId: 'united-states',
      assetChildren: [
        {
          assetName: 'California',
          assetId: 'calif',
          assetChildren: [
            {
              assetName: 'San Francisco',
              assetId: 'sf'
            },
            {
              assetName: 'Walnut Creek',
              assetId: 'wc'
            },
            {
              assetName: 'Sacramento',
              assetId: 'sc'
            }
          ]
        },
        {
          assetName: 'Arizona',
          assetId: 'ariz'
        },
        {
          assetName: 'Oregon',
          assetId: 'oregon'
        },
        {
          assetName: 'Washington',
          assetId: 'wash'
        }
      ]
    },
  ];

  before(function() {
    // Create a stub for the Popup base behavior
    Polymer({
      is: 'px-app-asset-activatable-stub',
      behaviors: [PxAppBehavior.AssetGraph, PxAppBehavior.AssetActivatable]
    });
  });

  describe('single activate', function() {
    beforeEach(function() {
      fx = fixture('AssetActivatableFixture');
      fx.items = data;
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('activates an item when `activate()` is called', function() {
      var item = data[0].children[1];
      fx.activate(item);
      expect(fx.active).to.equal(item);
    });

    it('changes the active item when `activate()` is called', function() {
      var item1 = data[0].children[1];
      var item2 = data[0].children[2];
      fx.activate(item1);
      fx.activate(item2);
      expect(fx.active).to.equal(item2);
    });

    it('clears the active item when `activate()` is called with `null`', function() {
      var item = data[0].children[1];
      fx.activate(item);
      fx.activate(null);
      expect(fx.active).to.be.null;
    });

    it('throws an error with `activate()` is called with an item not in the graph', function() {
      var item = {id:'uk', label:'United Kingdom'};
      var err;
      try {
        fx.activate(item);
      }
      catch (e) {
        err = e;
      }
      expect(err).to.be.instanceOf(Error);
    });

    it('deactivates the active item when `deactivate()` is called with the item', function() {
      var item = data[0].children[1];
      fx.activate(item);
      fx.deactivate(item);
      expect(fx.active).to.be.null;
    });

    it('deactivates the active item when `deactivate()` is called with null', function() {
      var item = data[0].children[1];
      fx.activate(item);
      fx.deactivate(null);
      expect(fx.active).to.be.null;
    });

    it('deactivates the active item when `deactivate()` is called with undefined', function() {
      var item = data[0].children[1];
      fx.activate(item);
      fx.deactivate();
      expect(fx.active).to.be.null;
    });

    it('updates the `activeRoute` when an item is activated', function() {
      var item = data[0].children[0].children[1];
      fx.activate(item);
      expect(fx.activeRoute).to.eql(['united-states', 'calif', 'wc']);
    });

    it('updates the `activeMeta` when an item is activated', function() {
      var item = data[0].children[0].children[1];
      fx.activate(item);
      expect(fx.activeMeta).to.be.instanceof(Object);
      expect(fx.activeMeta.item).to.equal(item);
      expect(fx.activeMeta.path.length).to.equal(3);
      expect(fx.activeMeta.path[0]).to.equal(data[0]);
      expect(fx.activeMeta.path[1]).to.equal(data[0].children[0]);
      expect(fx.activeMeta.path[2]).to.equal(item);
      expect(fx.activeMeta.route).to.eql(['united-states', 'calif', 'wc']);
      expect(fx.activeMeta.parent).to.eql(data[0].children[0]);
      expect(fx.activeMeta.children).to.be.eql([]);
      expect(fx.activeMeta.siblings).to.be.eql(data[0].children[0].children);
    });

    it('activates an item by event', function() {
      var item = data[0].children[1];
      fx.fire('px-app-asset-should-be-activated', {item:item});
      expect(fx.active).to.equal(item);
    });

    it('deactivates an item by event', function() {
      var item = data[0].children[1];
      fx.fire('px-app-asset-should-be-activated', {item:item});
      fx.fire('px-app-asset-should-be-deactivated', {item:item});
      expect(fx.active).to.be.null;
    });

    it('activates an item by route when `activeRoute` changes', function() {
      var item = data[0].children[0].children[0];
      fx.activeRoute = ['united-states', 'calif', 'sf'];
      expect(fx.active).to.equal(item);
    });

    it('deactivates the active item an item when `activeRoute` changes to null', function() {
      var item = data[0].children[0].children[0];
      fx.activate(item);
      expect(fx.active).to.equal(item);
      fx.activeRoute = null;
      expect(fx.active).to.equal(null);
    });

    it('deactivates the active item when `activeRoute` changes to an empty array', function() {
      var item = data[0].children[0].children[0];
      fx.activate(item);
      expect(fx.active).to.equal(item);
      fx.activeRoute = [];
      expect(fx.active).to.equal(null);
    });

    it('deactivates the active item when `multiActivate` changes to true', function() {
      var item = data[0].children[0].children[0];
      fx.activate(item);
      fx.multiActivate = true;
      expect(fx.active).to.eql([]);
    });


  });

  describe('multi activate', function() {
    beforeEach(function() {
      fx = fixture('AssetActivatableFixture');
      fx.multiActivate = true;
      fx.items = data;
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('activates multiple items when `activate()` is called with one item', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      expect(Array.isArray(fx.active)).to.equal(true);
      expect(fx.active.length).to.equal(2);
      expect(fx.active[0]).to.equal(item1);
      expect(fx.active[1]).to.equal(item2);
    });

    it('activates multiple items when `activate()` is called with an array of items', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate([item1,item2]);
      expect(Array.isArray(fx.active)).to.equal(true);
      expect(fx.active.length).to.equal(2);
      expect(fx.active[0]).to.equal(item1);
      expect(fx.active[1]).to.equal(item2);
    });

    it('does not activate an item that is already activated', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.activate(item1);
      expect(fx.active.length).to.equal(2);
    });

    it('clears all active items when `activate()` is called with null', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.activate(null);
      expect(fx.active.length).to.equal(0);
    });

    it('clears all active items when `activate()` is called with an empty array', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.activate([]);
      expect(fx.active.length).to.equal(0);
    });

    it('deactivates an item when `deactivate()` is called with one item', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.deactivate(item1);
      expect(fx.active.length).to.equal(1);
      expect(fx.active[0]).to.equal(item2);
    });

    it('deactivates multiple items when `deactivate()` is called with an array of items', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      var item3 = data[0].children[2];
      fx.activate(item1);
      fx.activate(item2);
      fx.activate(item3);
      fx.deactivate([item1,item2]);
      expect(fx.active.length).to.equal(1);
      expect(fx.active[0]).to.equal(item3);
    });

    it('clears all active items when `deactivate()` is called with undefined', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.deactivate();
      expect(fx.active.length).to.equal(0);
    });

    it('clears all actve items when `deactivate()` is called with null', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.deactivate(null);
      expect(fx.active.length).to.equal(0);
    });

    it('activates multiple items by event', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.fire('px-app-asset-should-be-activated', {item:item1});
      fx.fire('px-app-asset-should-be-activated', {item:item2});
      expect(fx.active.length).to.equal(2);
      expect(fx.active[0]).to.equal(item1);
      expect(fx.active[1]).to.equal(item2);
    });

    it('deactivates a single item by event', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.fire('px-app-asset-should-be-activated', {item:item1});
      fx.fire('px-app-asset-should-be-activated', {item:item2});
      fx.fire('px-app-asset-should-be-deactivated', {item:item1});
      expect(fx.active.length).to.equal(1);
      expect(fx.active[0]).to.equal(item2);
    });

    it('adds a newly active item\'s route to the `activeRoute` array', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      expect(fx.activeRoute.length).to.equal(2);
      expect(fx.activeRoute[0]).to.eql(['united-states','calif']);
      expect(fx.activeRoute[1]).to.eql(['united-states','ariz']);
    });

    it('adds an active item when its route is added to the `activeRoute` array', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.push('activeRoute', ['united-states','ariz']);
      expect(fx.active.length).to.equal(2);
      expect(fx.active[0]).to.equal(item1);
      expect(fx.active[1]).to.equal(item2);
    });

    it('removes an active item when its route is removed from the `activeRoute` array', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.splice('active', 0, 1);
      expect(fx.active.length).to.equal(1);
      expect(fx.active[0]).to.equal(item2);
    });

    it('adds an active item when its route is spliced in to the `activeRoute` array', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      var item3 = data[0].children[2];
      fx.activate(item1);
      fx.activate(item2);
      fx.splice('activeRoute', 1, 0, ['united-states', 'oregon']);
      expect(fx.active.length).to.equal(3);
      expect(fx.active[0]).to.equal(item1);
      expect(fx.active[1]).to.equal(item3);
      expect(fx.active[2]).to.equal(item2);
    });

    it('clears all active items when `activeRoute` is changed to null', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.activeRoute = null;
      expect(fx.active.length).to.equal(0);
    });

    it('clears all active items when `activeRoute` is changed to an empty array', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);
      fx.activeRoute = [];
      expect(fx.active.length).to.equal(0);
    });

    it('updates the `activeRoute` when a new active item is spliced in', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      var item3 = data[0].children[0].children[0];
      fx.activate(item1);
      fx.activate(item2);
      fx.splice('active', 1, 1, item3);
      expect(fx.activeRoute.length).to.equal(2);
      expect(fx.activeRoute[0]).to.eql(['united-states','calif']);
      expect(fx.activeRoute[1]).to.eql(['united-states','calif','sf']);
    });

    it('updates the `activeMeta` when an item is active', function() {
      var item1 = data[0].children[0];
      var item2 = data[0].children[1];
      fx.activate(item1);
      fx.activate(item2);

      expect(Array.isArray(fx.activeMeta)).to.equal(true);
      expect(fx.activeMeta.length).to.equal(2);

      expect(fx.activeMeta[0].item).to.equal(item1);
      expect(fx.activeMeta[1].item).to.equal(item2);
      expect(fx.activeMeta[0].path).to.eql([data[0], data[0].children[0]]);
      expect(fx.activeMeta[1].path).to.eql([data[0], data[0].children[1]]);
      expect(fx.activeMeta[0].route).to.eql(['united-states','calif']);
      expect(fx.activeMeta[1].route).to.eql(['united-states','ariz']);
      expect(fx.activeMeta[0].parent).to.equal(data[0]);
      expect(fx.activeMeta[1].parent).to.equal(data[0]);
      expect(fx.activeMeta[0].children).to.eql(item1.children);
      expect(fx.activeMeta[1].children).to.eql([]);
      expect(fx.activeMeta[0].siblings).to.eql(data[0].children);
      expect(fx.activeMeta[1].siblings).to.eql(data[0].children);
    });
  });

  describe('custom keys', function() {
    describe('[single activate]', function() {
      beforeEach(function() {
        fx = fixture('AssetActivatableFixture');
        fx.multiActivate = false;
        fx.keys = customKeys
        fx.items = customKeysData;
      });

      it('activates an item by route when `activeRoute` changes', function() {
        var item = customKeysData[0].assetChildren[0].assetChildren[0];
        fx.activeRoute = ['united-states', 'calif', 'sf'];
        expect(fx.active).to.equal(item);
      });

      it('updates the `activeRoute` when an item is activated', function() {
        var item = customKeysData[0].assetChildren[0].assetChildren[1];
        fx.activate(item);
        expect(fx.activeRoute).to.eql(['united-states', 'calif', 'wc']);
      });
    });
    describe('[multi activate]', function() {
      beforeEach(function() {
        fx = fixture('AssetActivatableFixture');
        fx.multiActivate = true;
        fx.keys = customKeys
        fx.items = customKeysData;
      });

      it('adds an `active` item when the `activeRoute` array changes', function() {
        var item1 = customKeysData[0].assetChildren[0];
        var item1Route = ['united-states','calif'];
        var item2 = customKeysData[0].assetChildren[1];
        var item2Route = ['united-states','ariz'];
        fx.activeRoute = [item1Route, item2Route];
        expect(fx.active.length).to.equal(2);
        expect(fx.active[0]).to.eql(item1);
        expect(fx.active[1]).to.eql(item2);
      });

      it('adds a newly activated item\'s route to the `activeRoute` array', function() {
        var item1 = customKeysData[0].assetChildren[0];
        var item2 = customKeysData[0].assetChildren[1];
        fx.activate(item1);
        fx.activate(item2);
        expect(fx.activeRoute.length).to.equal(2);
        expect(fx.activeRoute[0]).to.eql(['united-states','calif']);
        expect(fx.activeRoute[1]).to.eql(['united-states','ariz']);
      });

      it('down-activates to the first item when multi activate is disabled', function() {
        var item1 = customKeysData[0].assetChildren[0];
        var item2 = customKeysData[0].assetChildren[1];
        fx.activate(item1);
        fx.activate(item2);
        fx.multiActivate = false;
        expect(fx.active).to.equal(item1);
      });
    });
  });
});
