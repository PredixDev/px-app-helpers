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

describe('PxAppBehavior.AssetGraph', function () {
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
    {
      label: 'Canada',
      id: 'canada'
    }
  ];

  before(function() {
    // Create stubs for the asset graph behavior
    Polymer({
      is: 'px-app-asset-graph-stub',
      behaviors: [PxAppBehavior.AssetGraph]
    });
    Polymer({
      is: 'px-app-asset-graph-select-activate-stub',
      behaviors: [PxAppBehavior.AssetGraph, PxAppBehavior.AssetSelectable, PxAppBehavior.AssetActivatable]
    });
  });

  describe('[items]', function() {
    beforeEach(function() {
      fx = fixture('AssetGraphFixture');
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('builds an asset graph when `items` is first defined', function() {
      fx.items = data;
      expect(fx._assetGraph instanceof PxApp.AssetGraph).to.equal(true);
      expect(fx._assetGraph.hasNode(data[0].children[1])).to.equal(true);
    });

    it('adds the top-level `items` to the `__rootItems` array', function() {
      fx.items = data;
      expect(fx.__rootItems.length).to.equal(2);
      expect(fx.__rootItems[0]).to.equal(data[0]);
    });

    it('builds a new asset graph when `items` is reassigned to a new reference', function() {
      fx.items = data;
      var firstGraph = fx._assetGraph;
      var newData = [{ id: 'new-home', label: 'New Home', children: [{ id: 'new-child-1', label: 'New Child 1' }] }];
      fx.items = newData;
      expect(fx._assetGraph === firstGraph).to.equal(false);
      expect(fx._assetGraph.hasNode(data[0].children[1])).to.equal(false);
      expect(fx._assetGraph.hasNode(newData[0].children[0])).to.equal(true);
    });

    it('fires a \'px-app-asset-graph-created\' event when `items` is first defined', function(done) {
      this.timeout(200);
      fx.addEventListener('px-app-asset-graph-created', function(evt) {
        expect(evt.detail.graph === fx._assetGraph).to.equal(true);
        done();
      });
      fx.items = data;
    });

    it('fires a \'px-app-asset-graph-created\' event when `items` is reassigned to a new reference', function(done) {
      this.timeout(200);
      var callCount = 0;
      fx.addEventListener('px-app-asset-graph-created', function(evt) {
        callCount++;
        expect(evt.detail.graph === fx._assetGraph).to.equal(true);
        if (callCount === 2) {
          done();
        }
      });
      fx.items = data;
      fx.items = [{ id: 'new-home', label: 'New Home', children: [{ id: 'new-child-1', label: 'New Child 1' }] }];
    });

    it('assigns the children of the root of the asset graph to ', function(done) {
      this.timeout(200);
      var callCount = 0;
      fx.addEventListener('px-app-asset-graph-created', function(evt) {
        callCount++;
        expect(evt.detail.graph === fx._assetGraph).to.equal(true);
        if (callCount === 2) {
          done();
        }
      });
      fx.items = data;
      fx.items = [{ id: 'new-home', label: 'New Home', children: [{ id: 'new-child-1', label: 'New Child 1' }] }];
    });
  });

  describe('[adding and removing items]', function() {
    var children;

    beforeEach(function() {
      children = [{ id: 'new-child-1', label: 'New Child #1' }, { id: 'new-child-2', label: 'New Child #2' }];
      fx = fixture('AssetGraphFixtureSelectActivate');
      fx.items = data;
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    ///// ADDING

    it('adds new items to the root of the graph with `addChildren`', function() {
      fx.addChildren(null, children);
      var rootChildren = fx._assetGraph.getRootChildren();
      expect(rootChildren.length).to.equal(4); // 2 existing items + 2 new items
      expect(rootChildren[2]).to.equal(children[0]);
      expect(rootChildren[3]).to.equal(children[1]);
    });

    it('updates the `__rootItems` array when new children are added to root', function() {
      fx.addChildren(null, children);
      expect(fx.__rootItems.length).to.equal(4); // 2 existing items + 2 new items
      expect(fx.__rootItems[2]).to.equal(children[0]);
      expect(fx.__rootItems[3]).to.equal(children[1]);
    });

    it('adds new items to a parent node in the graph with `addChildren`', function() {
      var parent = fx.items[0].children[1];
      fx.addChildren(parent, children);
      var parentChildren = fx._assetGraph.getChildren(parent);
      expect(parentChildren.length).to.equal(2);
      expect(parentChildren[0]).to.equal(children[0]);
      expect(parentChildren[1]).to.equal(children[1]);
    });

    it('fires a \'px-app-asset-children-updated\' event when an item is added to a parent node in the graph', function(done) {
      this.timeout(200);
      var parent = fx.items[0].children[1];
      fx.addEventListener('px-app-asset-children-updated', function(evt) {
        expect(evt.detail.item).to.equal(parent);
        done();
      });
      fx.addChildren(parent, children);
    });

    ///// REMOVING

    it('removes items from the root of the graph with `removeChildren`', function() {
      var removed = data[1];
      fx.removeChildren(null, [removed]);
      var rootChildren = fx._assetGraph.getRootChildren();
      expect(rootChildren.length).to.equal(1);
    });

    it('removes all children from a parent node if `removeChildren` is called with null', function() {
      var parent = data[0].children[0];
      fx.removeChildren(parent, null);
      var parentChildren = fx._assetGraph.getChildren(parent);
      expect(parentChildren.length).to.equal(0);
    });

    it('updates the `__rootItems` array when items are removed from the root', function() {
      var removed = data[1];
      fx.removeChildren(null, [removed]);
      expect(fx.__rootItems.length).to.equal(1);
    });

    it('removes items from a parent node in the graph with `removeChildren`', function() {
      var parent = data[0].children[0];
      var removed = [data[0].children[0].children[0], data[0].children[0].children[1]]
      fx.removeChildren(parent, removed);
      var parentChildren = fx._assetGraph.getChildren(parent);
      expect(parentChildren.length).to.equal(1);
    });

    it('fires a \'px-app-asset-children-updated\' event when an item is added to a parent node in the graph', function(done) {
      this.timeout(200);
      var parent = data[0].children[0];
      var removed = [data[0].children[0].children[0], data[0].children[0].children[1]];
      fx.addEventListener('px-app-asset-children-updated', function(evt) {
        expect(evt.detail.item).to.equal(parent);
        done();
      });
      fx.removeChildren(parent, removed);
    });

    it('deselects the selected item if it is removed from the graph', function() {
      var parent = data[0];
      var item = data[0].children[0];
      fx.select(item);
      fx.removeChildren(parent, item);
      expect(fx.selected).to.equal(null);
    });

    it('deactivates the active item if it is removed from the graph', function() {
      var parent = data[0];
      var item = data[0].children[0];
      fx.activate(item);
      fx.removeChildren(parent, item);
      expect(fx.active).to.equal(null);
    });

    it('deselects the selected item if its ancestor is removed from the graph', function() {
      var ancestor = data[0];
      var parent = data[0].children[0];
      var item = data[0].children[0].children[0];
      fx.select(item);
      fx.removeChildren(null, ancestor);
      expect(fx.selected).to.equal(null);
    });

    it('deactivates the active item if its ancestor is removed from the graph', function() {
      var ancestor = data[0];
      var parent = data[0].children[0];
      var item = data[0].children[0].children[0];
      fx.activate(item);
      fx.removeChildren(null, ancestor);
      expect(fx.active).to.equal(null);
    });
  });

  describe('[custom keys]', function() {
    var dataCustomKeys;
    var customKeys;

    beforeEach(function() {
      fx = fixture('AssetGraphFixture');
      dataCustomKeys = [
        { name: 'Home', assetId: 'h01', assets: [
          { name: 'Child 1', assetId: 'c01', assets: [{name: 'Subchild 1', assetId: 'cs01'}] },
          { name: 'Child 2', assetId: 'c02' },
          { name: 'Child 3', assetId: 'c03' }
        ] },
        { name: 'Dashboards', assetId: 'd01' }
      ];
      customKeys = {
        id: 'assetId',
        label: 'name',
        children: 'assets'
      };
      sandbox = sinon.sandbox.create();
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('finds all children when a custom `children` key is used', function() {
      fx.keys = customKeys;
      fx.items = dataCustomKeys;
      expect(fx._assetGraph.getChildren(fx.items[0]).length).to.equal(3);
      expect(fx._assetGraph.hasNode(fx.items[0].assets[0])).to.equal(true);
      expect(fx._assetGraph.getChildren(fx.items[0].assets[0]).length).to.equal(1);
      expect(fx._assetGraph.hasNode(fx.items[0].assets[0].assets[0])).to.equal(true);
    });

    it('builds a new asset graph when `keys` is reassigned to a new reference', function() {
      fx.items = dataCustomKeys;
      var graph = fx._assetGraph;
      fx.keys = customKeys;
      expect(fx._assetGraph === graph).to.equal(false);
    });

    it('builds a new asset graph when the `keys.children` is changed', function() {
      fx.items = dataCustomKeys;
      var graph = fx._assetGraph;
      fx.set('keys.children', 'assets');
      expect(fx._assetGraph === graph).to.equal(false);
    });

    it('resets the active item when `keys` is reassigned to a new reference', function() {
      fx.items = dataCustomKeys;
      var activateFn = sandbox.spy();
      fx.activate = activateFn;
      fx.keys = customKeys;
      expect(activateFn).to.have.been.calledOnce;
      expect(activateFn).to.have.been.calledWith(null);
    });

    it('resets the selected item when `keys` is reassigned to a new reference', function() {
      fx.items = dataCustomKeys;
      var selectFn = sandbox.spy();
      fx.select = selectFn;
      fx.keys = customKeys;
      expect(selectFn).to.have.been.calledOnce;
      expect(selectFn).to.have.been.calledWith(null);
    });

    it('resets the active and selected item when `keys.children` is changed', function() {
      fx.items = dataCustomKeys;
      var selectFn = sandbox.spy();
      var activateFn = sandbox.spy();
      fx.select = selectFn;
      fx.activate = activateFn;
      fx.set('keys.children', 'assets');
      expect(selectFn).to.have.been.calledOnce;
      expect(selectFn).to.have.been.calledWith(null);
      expect(activateFn).to.have.been.calledOnce;
      expect(activateFn).to.have.been.calledWith(null);
    });
  });
});
