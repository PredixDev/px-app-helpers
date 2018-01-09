function setLocation(url) {
  window.history.pushState({}, '', url);
  Polymer.Base.fire('location-changed', {}, { node: window });
};

describe('<px-app-route>', () => {
  let fx;
  let appRoute;
  let originalLocation;

  before(() => {
    Polymer({ is: 'app-route-test-wrapper' });
  });

  beforeEach((done) => {
    originalLocation = window.location.toString();
    fx = fixture('AppRouteFixture');
    flush(() => {
      appRoute = Polymer.dom(fx.root).querySelector('px-app-route');
      done();
    });
  });

  afterEach(() => {
    setLocation(originalLocation);
  });

  it('does nothing to the window location if no properties are set', () => {
    expect(window.location.toString()).to.equal(originalLocation);
  });

  it('updates the URL when `navRoute` is changed', () => {
    appRoute.navRoute = ['home'];
    expect(window.location.hash).to.equal('#/home');
  });

  it('updates the URL when `assetRoute` is changed', () => {
    appRoute.assetRoute = ['us', 'ca', 'sf'];
    expect(window.location.hash).to.equal('#/~/us/ca/sf');
  });

  it('updates the URL when `assetRoute` and `navRoute` are changed', () => {
    appRoute.navRoute = ['dashboards', 'turbines'];
    appRoute.assetRoute = ['us', 'az', 'tc'];
    expect(window.location.hash).to.equal('#/dashboards/turbines~/us/az/tc');
  });

  it('updates the `navRoute` when the URL is changed', () => {
    setLocation('/#/countries/united-states');
    expect(appRoute.navRoute).to.deep.equal(['countries', 'united-states']);
  });

  it('updates the `assetRoute` when the URL is changed', () => {
    setLocation('/#/~/foo/bar');
    expect(appRoute.assetRoute).to.deep.equal(['foo', 'bar']);
  });

  it('updates the `assetRoute` and `navRoute` when the URL is changed', () => {
    setLocation('/#/countries/united-states~/foo/bar');
    expect(appRoute.navRoute).to.deep.equal(['countries', 'united-states']);
    expect(appRoute.assetRoute).to.deep.equal(['foo', 'bar']);
  });

  it('correctly sets the URL using custom path/model segments', () => {
    appRoute.segmentModelsWith = '-';
    appRoute.segmentPathsWith = '.';
    appRoute.navRoute = ['countries', 'uk'];
    appRoute.assetRoute = ['engines', 'ge', '1001'];
    expect(window.location.hash).to.equal('#.countries.uk-.engines.ge.1001');
  });

  it('correctly reads the URL using custom path/model segments', () => {
    appRoute.segmentModelsWith = '-';
    appRoute.segmentPathsWith = '.';
    setLocation('#.countries.us-.engines.ge.1002');
    expect(appRoute.navRoute).to.deep.equal(['countries', 'us']);
    expect(appRoute.assetRoute).to.deep.equal(['engines', 'ge', '1002']);
  });
});
