# [ccNetViz](http://helikarlab.github.io/ccNetViz/)

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

====================================

Graph theory (a.k.a. network) library for analysis and visualisation

Visit our [webpage](http://helikarlab.github.io/ccNetViz/) to see the detailed docs and examples.

**Description**

[ccNetViz](http://helikarlab.github.io/ccNetViz) is a lightweight, high performance javascript library for large network graphs (see [graph theory](https://en.wikipedia.org/wiki/Graph_theory)) visualization using WebGL.
It enables custom styling of nodes and edges in css like way, curve edges, dynamic changes of the network, force-directed layout and basic graph interactivity.
Used for example by [Cell Collective](http://cellcollective.org) project.
[ccNetViz](http://helikarlab.github.io/ccNetViz) is open source library available under [GPLv3](http://www.gnu.org/licenses/gpl-3.0.en.html) License.

**Basic Example**
```html
<!DOCTYPE html>
<html>
<head>
  <title>ccNetViz example</title>
  <style type="text/css">
    #container {
      width: 500px;
      height: 500px;
    }
  </style>
  <script src="lib/ccNetViz.js"></script>
</head>
<body>
  <canvas id="container"/>
  <script>
    var graph = new ccNetViz(document.getElementById('container'), {
      styles: {
        node: { texture: "images/node.png", label: { hideSize: 16 } },
        edge: { arrow: { texture: "images/arrow.png" } }
      }});
    var nodes = [
      { label: "Hello" },
      { label: "World" },
      { label: "!" }
    ];
    var edges = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[2], target: nodes[1] }
    ];
    graph.set(nodes, edges, "force");
    graph.draw();
  </script>
</body>
</html>
```

**In-built support for the multiple layouts**

Recommended layout is **Force** based.

Inbuilt support for multiple layouts such as the **Force**, **Hierarchical**, **Circular**, **Spectral**, **Hive**, **Grid**, **Versinus**.

Inbuilt support for two modifications of **Tree** layout.

* Graph layouts - [live example](http://helikarlab.github.io/ccNetViz/examples/layouts.html)
* Tree-specific layouts - [live example](http://helikarlab.github.io/ccNetViz/examples/tree.html)

If you want to use one of our in-built layout ( see the https://github.com/HelikarLab/ccNetViz/tree/master/src/layout for list of all available ones ),
pass it as second parameter into the set function such as:

```javascript
  graph.set(nodes, edges, "force"); //set the force layout
```



**Advanced Examples**

* Advanced styling - [live example](http://helikarlab.github.io/ccNetViz/examples/styles.html)
* Complex graphs - [live example](http://helikarlab.github.io/ccNetViz/examples/complex.html)
* Mouse event on hover - [live example](http://helikarlab.github.io/ccNetViz/examples/interactivity_hover.html)
* Mouse events on move - [live example](http://helikarlab.github.io/ccNetViz/examples/interactivity_move.html)
* Multi level - [live example](http://helikarlab.github.io/ccNetViz/examples/multi_level.html)
* Save graphs - [live example](http://helikarlab.github.io/ccNetViz/examples/save_graph.html)
* Using SDF fonts - [live example](http://helikarlab.github.io/ccNetViz/examples/sdf.html)
* User definied layout - [live example](http://helikarlab.github.io/ccNetViz/examples/userdef_layout.html)
* Edges-to-edges support - [live example](http://helikarlab.github.io/ccNetViz/examples/edges_to_edges.html)

**Documentation**

***ccNetViz(element, options)***

Creates new ccNetViz graph renderer attached to canvas element specified as first argument, styled with styles defined in styles property of options parameter.

*Example options*

```javascript
{
  styles: {
    background: { color: "rgb(0, 0, 0)" },  //background color of canvas, default: "rgb(255, 255, 255)"
    node: { //predefined style
      minSize: 8,   //minimum size of node representation in pixels, default: 6
      maxSize: 16,    //maximum size of node representation in pixels, default: 16
      color: "rgb(255, 0, 0)",  //node color (combined with node image), default: "rgb(255, 255, 255)"
      texture: "images/circle.png",   //node image
      label: {
        hideSize: 16,   //minimum size (height) for the label to be displayed
        color: "rgb(120, 0, 0)",  //label color, default: "rgb(120, 120, 120)"
        font: { //label font
          type: "Arial, Helvetica, sans-serif",
          size: 15
        }
      }
    },
    edge: {   //predefined style
      width: 2,   //edge width in pixels, default: 1
      color: "rgb(86, 86, 86)",   //edge color, default: "rgb(204, 204, 204)"
      arrow: {
        minSize: 6,   //minimum size of arrow in pixels, default: 6
        maxSize: 12,  //maximum size of arrow, default: 12
        aspect: 2,  //aspect of arrow image, default: 1
        texture: "images/arrow.png",  //arrow image
        hideSize: 2   //minimum size of arrow to be displayed
      },
      type: "line"    //type of edge (supported types - "line", "dashed", "dotted", "chain-dotted")
    },
    nodeBlue: {   //custom style
      color: "rgb(0, 0, 255)"
    },
    nodeGiant: {  //custom style
      minSize: 16
    },
    nodeWithSmallBlueLabel: {   //custom style
      label: {
        color: "rgb(0, 0, 255)",
        font: { //label font
          type: "Arial, Helvetica, sans-serif",
          size: 11
        }
      }
    },
    nodeWithSDFFont: {   //custom style with rendering SDF fonts
      label: {
        color: "rgb(0, 0, 255)",
        font: {
          type: "sdf",
          texture: "fonts/OpenSans-Regular.png",    //SDF (Signed distance field) texture
          metrics: "fonts/OpenSans-Regular.json",   //SDF metrics
          size: 15,
          outlineColor: "rgb(0,255,255)"            //color of outline - optional ( if it is not setted - background color would be used )
        }
      }
    },
    edgeWideYellow: {   //custom style
      width: 4,
      color: "rgb(255, 255, 0)"
    },
    edgeWithWhiteArrow: {   //custom style
      arrow: {
        color: "rgb(255, 255, 255)"
      }
    }
  },
  onChangeViewport: function(viewport){},	//called every time viewport changes
  onLoad: function(){},	//called when graph loaded
  getNodesCount(){},	//callback to use if you want to force nodes count into this library (used to calculate curve excentricity and other built in options), expecting number as return value
  getEdgesCount(){},		//callback to use if you want to force edges count into this library (used to calculate curve excentricity and other built in options), expecting number as return value
  onDrag: function(viewport){}, //drag event, disable original event in case of return false
  onZoom: function(viewport){}, //zoom event, disable original event in case of return false
  onClick: function(){},	//called on click on graph
  onDblClick: function(){},	//called on double click on graph
  passiveEvts: false, //make mouse events passive for performance reasons ( default false )
  bidirectional: "curves" // ["curves"|"overlap"] how to show bidirectional nodes ( default "curves" ), if overlap then the edges are shown like line with two arrows
}
```

There are three predefined styles:
* node: default style used for all nodes
* edge: default style used for all edges
* background: default style used for canvas background

All default property values of these styles can be overriden (as in example above).

Besides overriding default styles (used for all nodes / edges) it is possible to define custom styles (like "nodeBlue" etc. in example above) and then use this style just for specified subsets of nodes / edges (see bellow how to define style for given node / edge). Property values specified for given custom style override default style values.

When you want to use SDF (signed distance field) fonts, you can use one of our predefined style from
[our github io page](http://helikarlab.github.io/ccNetViz/fonts) or generate your own with
[node-fontnik](https://github.com/mapbox/node-fontnik).

***set(nodes, edges, layout)***

Sets the data to be displayed by given ccNetViz instance. "nodes" argument is an array of objects describing graph nodes. Each node can have following properties:
* label (optional): text label for given node (displayed if node labels are enabled by node label style)
* x, y (optional): predefined position for given node (if "layout" argument is not specified these positions will be used for graph layout)
* color (optional): ccNetViz.color object defining color for this given node (use this in case of coloring each node separately, for coloring groups of nodes use color property of node style)
* style (optional): name of custom style class used for this node (for example: "nodeBlue" see above section for how to define custom styles)

"edges" argument is an array of objects describing directed graph edges. Each edge has following properties:
* source: pointer to given source node object
* target: pointer to given target node object
* style (optional): name of custom style class used for this edge

Optional "layout" argument defines layout used to render this graph. Possible values: "force", "random", "circular", "tree". If not specified, positions are taken from each node x, y properties.


***find(x, y, radius, nodes, edges)***


***findArea(x1, y1, x2, y2, nodes, edges)***




***draw()***

Renders current data.


***resize()***

Adjust graph for current canvas size.


***resetView()***

Reset zoom and panning.


***setViewport(viewport)***

Set graph viewport.

"viewport" argument is an object with keys to modify (all of keys are optional)

```javascript
{
  "x": 0.123,	//x offset of viewport (number in range 0-1), optional
  "y": 0.326,	//y offset of viewport (number in range 0-1), optional
  "size": 0.98,	//size value of viewport (number in range 0-1) - the amount of original screen that is visible, optional
}
```

***cntShownNodes()***

Get number of nodes

***cntShownEdges()***

Get number of edges


***remove()***

Clear graph and remove internal events from DOM.


***nodes***

Property to access nodes data of given graph. Use this just to read current values, for modification use "set" method instead.


***edges***

Property to access edges data of given graph. Use this just to read current values, for modification use "set" method instead.

### Development in ccNetViz
This is the pipeline you should follow to make changes to ccNetViz:

1. Clone the repository.
2. Run `npm install` inside the cloned repository.
   3.Start a server
   (such as Apache or using http-server globally) with a path to the ccNetViz directory.
3. Make changes to src/ tree.
4. Build with `npm run build` on the ccNetViz root directory.
5. Clear cache from browser if updates are not loading: e.g. in Chrome, go to settings->privacy->Clear Browsing Data->select only "Cache images and files" and click "Clear browsing data".
6. Run a test page (e.g. anyone in examples/) at the browser to see the results.

### Contributing

If you are looking to contribute to ccNetViz, fork the ccNetViz repo, follow all the above steps (i.e. Development in ccNetViz), commit the changes(ccNetViz follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification) specification, please adhere to this format of commits in your Pull Requests) to your fork and make a pull request to ccNetViz.

[HeilikarLab]: https://github.com/HelikarLab/ccNetViz

### Commands to set up a Local Server

Run "$ npm start" in the root directory.

Notes:
* If the file tree does not get updated, there might be issues with the files you are trying to update.
You can try: "$ ./node\_modules/.bin/babel --presets=es2015 ./src/<path>/<the_new_file>.js" to get things working.
* You have to build the package (e.g. into dist/) to run new code, i.e. you cannot make changes to src/ tree and load them to the browser.
* E.g. in Chrome, it always reused the package from cache
(ctrl+shift+r does not force it to reload recently built package),
i.e. you have to clear the cache.
