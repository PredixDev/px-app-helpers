# px-app-helpers

## Overview

px-app-helpers is a repository containing components and behaviors that are useful for creating an application using Predix UI. The app-header component
provides a container and scroll behavior for pinning a navigation and branding bar to the top of an application. The asset graph, activatable, and selectable
behaviors all help to create and interact with an asset model within an application, and is used by the context browser, tree, and breadcrumbs components.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-app-helpers --save
```

Second, import any of the included components to your application with one of the following tags in your head.

```
<link rel="import" href="/bower_components/px-app-helpers/px-app-header/px-app-header.html"/>
<link rel="import" href="/bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-selectable.html"/>
<link rel="import" href="/bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-activatable.html"/>
<link rel="import" href="/bower_components/px-app-helpers/px-app-asset/px-app-asset-behavior-graph.html"/>
```

Finally, use the components in your application:

```
<px-app-header>
  <px-app-nav slot="app-nav" items="..."></px-app-nav>
</px-app-header>
```

and/or:

```
behaviors: [
  PxAppBehavior.AssetGraph,
  PxAppBehavior.AssetSelectable,
  PxAppBehavior.AssetActivatable
],
```

<br />
<hr />

## Documentation

Read the full API and view the demo [here](https://predixdev.github.io/px-app-helpers).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-app-helpers/issues) to submit any bugs you might find.
