(function() {
  Polymer({
    is: 'px-app-header',
    properties: {
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
