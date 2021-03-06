const CONFIG = require('./config')

// http://stackoverflow.com/questions/27688804/how-do-i-debug-error-spawn-enoent-on-node-js
var childProcess = require("child_process");
var oldSpawn = childProcess.spawn;
function mySpawn() {
    console.log('spawn called');
    console.log(arguments);
    var result = oldSpawn.apply(this, arguments);
    return result;
}
childProcess.spawn = mySpawn;


const generateImageSizes = require('./generate-image-sizes')
generateImageSizes(CONFIG.imageSourcePath, CONFIG.imageDestinationPath)
