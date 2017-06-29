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
      beforeEach(function () {
        fx = fixture('AssetSelectableFixture');
        fx.items = data;
        sandbox = sinon.sandbox.create();
      });

      afterEach(function () {
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

      it('updates the selectedRoute when an item is selected', function() {
        var item = data[0].children[0].children[1];
        fx.select(item);
        expect(fx.selectedRoute).to.eql(['united-states', 'calif', 'wc']);
      });

      it('updates the selectedPath when an item is selected', function() {
        var item = data[0].children[0].children[1];
        fx.select(item);
        expect(fx.selectedPath[0]).to.equal(data[0]);
        expect(fx.selectedPath[1]).to.equal(data[0].children[0]);
        expect(fx.selectedPath[2]).to.equal(data[0].children[0].children[1]);
      });

      it('updates the selectedParent when an item is selected', function() {
        var item = data[0].children[0];
        var parent = data[0];
        var siblings = data[0].children;
        fx.select(item);
        expect(fx.selectedParent).to.equal(parent);
      });

      it('updates the selectedSiblings when an item is selected', function() {
        var item = data[0].children[0];
        var siblings = data[0].children;
        fx.select(item);
        expect(fx.selectedSiblings).to.equal(siblings);
      });

      it('updates the selectedChildren when an item is selected', function() {
        var item = data[0].children[0];
        var children = data[0].children[0].children;
        fx.select(item);
        expect(fx.selectedChildren).to.equal(children);
      });

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
      it('foo', function() {
        expect(true).to.equal(true);
      })
    });
  });

}
