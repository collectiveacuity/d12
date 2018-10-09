/* a script to create a version number for the distribution file */
var fs = require('fs');
var path = require('path');

function create_version(dist_folder='./dist'){
  if (fs.existsSync('package.json')){
    var p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    var v = p.version;
    var n = p.name;
    var name = n + '.js';
    var min = n + '.min.js';
    var name_version = n + '-' + v + '.js';
    var min_version = n + '-' + v + '.min.js';
    var name_path = [ path.join(dist_folder, name), path.join(dist_folder, name_version) ];
    var min_path = [ path.join(dist_folder, min), path.join(dist_folder, min_version) ];
    if (fs.existsSync(name_path[0]) && !fs.existsSync(name_path[1])){
      fs.copyFileSync(name_path[0], name_path[1])
    }
    if (fs.existsSync(min_path[0]) && !fs.existsSync(min_path[1])){
      fs.copyFileSync(min_path[0], min_path[1])
    }
  }
}

create_version();