document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {
  describe('PxAppBehavior.AssetSelectable', function () {
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

    before(function() {
      // Create a stub for the Popup base behavior
      Polymer({
        is: 'px-app-asset-selectable-stub',
        behaviors: [PxAppBehavior.AssetGraph, PxAppBehavior.AssetSelectable]
      });
    });

    describe('single select', function() {
      beforeEach(function() {
        fx = fixture('AssetSelectableFixture');
        fx.items = data;
        sandbox = sinon.sandbox.create();
      });

      afterEach(function() {
        sandbox.restore();
      });

      it('selects an item when `select()` is called', function() {
        var item = data[0].children[1];
        fx.select(item);
        expect(fx.selected).to.equal(item);
      });

      it('changes the selected item when `select()` is called', function() {
        var item1 = data[0].children[1];
        var item2 = data[0].children[2];
        fx.select(item1);
        fx.select(item2);
        expect(fx.selected).to.equal(item2);
      });

      it('clears the selected item when `select()` is called with `null`', function() {
        var item = data[0].children[1];
        fx.select(item);
        fx.select(null);
        expect(fx.selected).to.be.null;
      });

      it('throws an error with `select()` is called with an item not in the graph', function() {
        var item = {id:'uk', label:'United Kingdom'};
        var err;
        try {
          fx.select(item);
        }
        catch (e) {
          err = e;
        }
        expect(err).to.be.instanceOf(Error);
      });

      it('deselects the selected item when `deselect()` is called with the item', function() {
        var item = data[0].children[1];
        fx.select(item);
        fx.deselect(item);
        expect(fx.selected).to.be.null;
      });

      it('deselects the selected item when `deselect()` is called with null', function() {
        var item = data[0].children[1];
        fx.select(item);
        fx.deselect(null);
        expect(fx.selected).to.be.null;
      });

      it('deselects the selected item when `deselect()` is called with undefined', function() {
        var item = data[0].children[1];
        fx.select(item);
        fx.deselect();
        expect(fx.selected).to.be.null;
      });

      it('updates the `selectedRoute` when an item is selected', function() {
        var item = data[0].children[0].children[1];
        fx.select(item);
        expect(fx.selectedRoute).to.eql(['united-states', 'calif', 'wc']);
      });

      it('updates the `selectedMeta` when an item is selected', function() {
        var item = data[0].children[0].children[1];
        fx.select(item);
        expect(fx.selectedMeta).to.be.instanceof(Object);
        expect(fx.selectedMeta.item).to.equal(item);
        expect(fx.selectedMeta.path.length).to.equal(3);
        expect(fx.selectedMeta.path[0]).to.equal(data[0]);
        expect(fx.selectedMeta.path[1]).to.equal(data[0].children[0]);
        expect(fx.selectedMeta.path[2]).to.equal(item);
        expect(fx.selectedMeta.route).to.eql(['united-states', 'calif', 'wc']);
        expect(fx.selectedMeta.parent).to.equal(data[0].children[0]);
        expect(fx.selectedMeta.children).to.be.eql([]);
        expect(fx.selectedMeta.siblings).to.be.eql(data[0].children[0].children);
      });

      // it('updates the `selectedPath` when an item is selected', function() {
      //   var item = data[0].children[0].children[1];
      //   fx.select(item);
      //   expect(fx.selectedPath[0]).to.equal(data[0]);
      //   expect(fx.selectedPath[1]).to.equal(data[0].children[0]);
      //   expect(fx.selectedPath[2]).to.equal(data[0].children[0].children[1]);
      // });
      //
      // it('updates the `selectedParent` when an item is selected', function() {
      //   var item = data[0].children[0];
      //   var parent = data[0];
      //   fx.select(item);
      //   expect(fx.selectedParent).to.equal(parent);
      // });
      //
      // it('sets the `selectedParent` to null when the selected item has no parent', function() {
      //   var item = data[0];
      //   fx.select(item);
      //   expect(fx.selectedParent).to.be.null;
      // });
      //
      // it('updates the `selectedSiblings` when an item is selected', function() {
      //   var item = data[0].children[0];
      //   var siblings = data[0].children;
      //   fx.select(item);
      //   expect(fx.selectedSiblings).to.equal(siblings);
      // });
      //
      // it('sets the `selectedSiblings` to an array containing only the selected item when it has no siblings', function() {
      //   var item = data[0];
      //   fx.select(item);
      //   expect(fx.selectedSiblings.length).to.equal(1);
      //   expect(fx.selectedSiblings[0]).to.equal(data[0]);
      // });
      //
      // it('updates the `selectedChildren` when an item is selected', function() {
      //   var item = data[0].children[0];
      //   var children = data[0].children[0].children;
      //   fx.select(item);
      //   expect(fx.selectedChildren).to.equal(children);
      // });
      //
      // it('sets the `selectedChildren` to an empty array when the selected item has no children', function() {
      //   var item = data[0].children[1];
      //   fx.select(item);
      //   expect(fx.selectedChildren).to.eql([]);
      // });

      it('selects an item by event', function() {
        var item = data[0].children[1];
        fx.fire('px-app-asset-should-be-selected', {item:item});
        expect(fx.selected).to.equal(item);
      });

      it('deselects an item by event', function() {
        var item = data[0].children[1];
        fx.fire('px-app-asset-should-be-selected', {item:item});
        fx.fire('px-app-asset-should-be-deselected', {item:item});
        expect(fx.selected).to.be.null;
      });

      it('selects an item by route when `selectedRoute` changes', function() {
        var item = data[0].children[0].children[0];
        fx.selectedRoute = ['united-states', 'calif', 'sf'];
        expect(fx.selected).to.equal(item);
      });
    });

    describe('multi select', function() {
      beforeEach(function() {
        fx = fixture('AssetSelectableFixture');
        fx.multiSelect = true;
        fx.items = data;
        sandbox = sinon.sandbox.create();
      });

      afterEach(function() {
        sandbox.restore();
      });

      it('selects multiple items when `select()` is called with one item', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        expect(Array.isArray(fx.selected)).to.equal(true);
        expect(fx.selected.length).to.equal(2);
        expect(fx.selected[0]).to.equal(item1);
        expect(fx.selected[1]).to.equal(item2);
      });

      it('selects multiple items when `select()` is called with an array of items', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select([item1,item2]);
        expect(Array.isArray(fx.selected)).to.equal(true);
        expect(fx.selected.length).to.equal(2);
        expect(fx.selected[0]).to.equal(item1);
        expect(fx.selected[1]).to.equal(item2);
      });

      it('does not select an item that is already selected', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.select(item1);
        expect(fx.selected.length).to.equal(2);
      });

      it('clears all selected items when `select()` is called with null', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.select(null);
        expect(fx.selected.length).to.equal(0);
      });

      it('clears all selected items when `select()` is called with an empty array', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.select([]);
        expect(fx.selected.length).to.equal(0);
      });

      it('deselects an item when `deselect()` is called with one item', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.deselect(item1);
        expect(fx.selected.length).to.equal(1);
        expect(fx.selected[0]).to.equal(item2);
      });

      it('deselects multiple items when `deselect()` is called with an array of items', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        var item3 = data[0].children[2];
        fx.select(item1);
        fx.select(item2);
        fx.select(item3);
        fx.deselect([item1,item2]);
        expect(fx.selected.length).to.equal(1);
        expect(fx.selected[0]).to.equal(item3);
      });

      it('clears all selected items when `deselect()` is called with undefined', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.deselect();
        expect(fx.selected.length).to.equal(0);
      });

      it('clears all selected items when `deselect()` is called with null', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.deselect(null);
        expect(fx.selected.length).to.equal(0);
      });

      it('selects multiple items by event', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.fire('px-app-asset-should-be-selected', {item:item1});
        fx.fire('px-app-asset-should-be-selected', {item:item2});
        expect(fx.selected.length).to.equal(2);
        expect(fx.selected[0]).to.equal(item1);
        expect(fx.selected[1]).to.equal(item2);
      });

      it('deselects a single item by event', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.fire('px-app-asset-should-be-selected', {item:item1});
        fx.fire('px-app-asset-should-be-selected', {item:item2});
        fx.fire('px-app-asset-should-be-deselected', {item:item1});
        expect(fx.selected.length).to.equal(1);
        expect(fx.selected[0]).to.equal(item2);
      });

      it('adds a newly selected item\'s route to the `selectedRoute` array', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        expect(fx.selectedRoute.length).to.equal(2);
        expect(fx.selectedRoute[0]).to.eql(['united-states','calif']);
        expect(fx.selectedRoute[1]).to.eql(['united-states','ariz']);
      });

      it('adds a selected item when its route is added to the `selectedRoute` array', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.push('selectedRoute', ['united-states','ariz']);
        expect(fx.selected.length).to.equal(2);
        expect(fx.selected[0]).to.equal(item1);
        expect(fx.selected[1]).to.equal(item2);
      });

      it('removes a selected item when its route is removed from the `selectedRoute` array', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);
        fx.splice('selectedRoute', 0, 1);
        expect(fx.selected.length).to.equal(1);
        expect(fx.selected[0]).to.equal(item2);
      });

      it('updates the `selectedMeta` when an item is selected', function() {
        var item1 = data[0].children[0];
        var item2 = data[0].children[1];
        fx.select(item1);
        fx.select(item2);

        expect(Array.isArray(fx.selectedMeta)).to.equal(true);
        expect(fx.selectedMeta.length).to.equal(2);

        expect(fx.selectedMeta[0].item).to.equal(item1);
        expect(fx.selectedMeta[1].item).to.equal(item2);
        expect(fx.selectedMeta[0].path).to.eql([data[0], data[0].children[0]]);
        expect(fx.selectedMeta[1].path).to.eql([data[0], data[0].children[1]]);
        expect(fx.selectedMeta[0].route).to.eql(['united-states','calif']);
        expect(fx.selectedMeta[1].route).to.eql(['united-states','ariz']);
        expect(fx.selectedMeta[0].parent).to.equal(data[0]);
        expect(fx.selectedMeta[1].parent).to.equal(data[0]);
        expect(fx.selectedMeta[0].children).to.equal(item1.children);
        expect(fx.selectedMeta[1].children).to.eql([]);
        expect(fx.selectedMeta[0].siblings).to.equal(data[0].children);
        expect(fx.selectedMeta[1].siblings).to.equal(data[0].children);
      });

      // it('updates the selectedPath when multiple items are selected', function() {
      //   expect(fx.selectedPath.length).to.equal(2);
      //   expect(fx.selectedPath[0]).to.eql([data[0], data[0].children[0]]);
      //   expect(fx.selectedPath[1]).to.eql([data[0], data[0].children[1]]);
      // });
      //
      // it('updates the selectedParent when multiple items are selected', function() {
      //   var item1 = data[0].children[0];
      //   var item2 = data[0].children[1];
      //   fx.select(item1);
      //   fx.select(item2);
      //   expect(Array.isArray(fx.selectedParent)).to.equal(true);
      //   expect(fx.selectedParent.length).to.equal(2);
      //   expect(fx.selectedParent[0]).to.equal(data[0]);
      //   expect(fx.selectedParent[1]).to.equal(data[0]);
      // });
      //
      // it('updates the selectedSiblings when multiple items are selected', function() {
      //   var item1 = data[0].children[0];
      //   var item2 = data[0].children[1];
      //   fx.select(item1);
      //   fx.select(item2);
      //   expect(Array.isArray(fx.selectedSiblings)).to.equal(true);
      //   expect(fx.selectedSiblings.length).to.equal(2);
      //   expect(fx.selectedSiblings[0]).to.equal(data[0].children);
      //   expect(fx.selectedSiblings[1]).to.equal(data[0].children);
      // });
      //
      // it('updates the selectedChildren when multiple items are selected', function() {
      //   var item1 = data[0].children[0];
      //   var item2 = data[0].children[1];
      //   fx.select(item1);
      //   fx.select(item2);
      //   expect(Array.isArray(fx.selectedChildren)).to.equal(true);
      //   expect(fx.selectedChildren.length).to.equal(2);
      //   expect(fx.selectedChildren[0]).to.equal(data[0].children[0].children);
      //   expect(fx.selectedChildren[1]).to.be.null;
      // });
    });
  });

}
