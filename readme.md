# @atomic-reactor/node-sass-reactium-importer

A node-sass custom importer which turns ~ into absolute paths to the nearest parent node_modules directory and turns + into absolute paths to the nearest parent reactium_modules directory.

## Install

```sh
npm install --save-dev @atomic-reactor/node-sass-reactium-importer
```

## Usage

```js
var sass = require('node-sass');
var reactiumImporter = require('@atomic-reactor/node-sass-reactium-importer');

var result = sass.renderSync({
    data: scss_content,
    importer: reactiumImporter,
});
```

`scss example`

```css
@import '+@atomic-reactor/toolkit/src/style/rtk';'
@import '~@atomic-reactor/reactium-ui/assets/style/reactium-ui';
```

`node-sass` cli example:

```sh
node-sass style.scss --importer=node_modules/node-sass-reactium-importer
```

Please refer to the node-sass [readme](https://github.com/sass/node-sass#readme) for full instruction on how to use custom importers.
