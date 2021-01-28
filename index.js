var fs = require("fs");
var path = require("path");
var findParentDir = require("find-parent-dir");

var kvp = {
  "+": "reactium_modules",
  "~": "node_modules"
};

function resolve(targetUrl, source, chr) {
    
  var d = kvp[chr] || 'node_modules';

  var packageRoot = findParentDir.sync(source, d);

  if (!packageRoot) {
    return null;
  }

  var filePath = path.resolve(packageRoot, d, targetUrl);
  var isPotentiallyDirectory = !path.extname(filePath);

  if (isPotentiallyDirectory) {
    if (fs.existsSync(filePath + ".scss")) {
      return filePath + ".scss";
    }

    if (fs.existsSync(filePath)) {
      return path.resolve(filePath, "index");
    }
  }

  if (fs.existsSync(path.dirname(filePath))) {
    return filePath;
  }

  return resolve(targetUrl, path.dirname(packageRoot));
}

module.exports = function importer(url, prev, done) {
  const chr = url[0];
  return Object.keys(kvp).includes(chr)
    ? { file: resolve(url.substr(1), prev, chr) }
    : null;
};
