const async = require("async");
const path = require('path')
const dir = require('node-dir')
const im = require("gm").subClass({imageMagick: true});
const fs = require('fs-extra')
const CONFIG = require('./config')

function getImageType(objectContentType) {
  if (objectContentType === "image/jpeg") {
    return "jpeg";
  } else if (objectContentType === "image/png") {
    return "png";
  } else {
    throw new Error("unsupported objectContentType " + objectContentType);
  }
}

function cross(left, right) {
  var res = [];
  left.forEach(function(l) {
    right.forEach(function(r) {
      res.push([l, r]);
    });
  });
  return res;
}


module.exports = function generateImageSizes(imageSourcePath, imageDestinationPath) {

  // To insure we have unique file names I could
  // I could add IDs to all files before generating there sizes
  // then the link from the md file will be wrong
  // could I pull it from the file?

  dir.readFiles(imageSourcePath, {
    match: /.jpe?g$/,
    // excludeDir: /^(assets)$/
  }, (err, content, filename, next) => {
    if (err) throw err
    next()
  }, (err, images) => {
    if (err) {
      console.log(err)
    }

    var resizePairs = cross(CONFIG.sizes, images);
    async.each(resizePairs, function(resizePair, cb) {
      var config = resizePair[0];
      var image = resizePair[1];
      //var name = path.basename(image);
      const basename = path.basename(image)
      const name = basename.substring(0, basename.indexOf("."))
      const extension = basename.split(".").pop();
      console.log("size: ", config,  " name: ", name);

      const quality = config === '20x20' ? 20 : 80;

      im(image).resize(config).quality(quality).toBuffer("jpeg", function(err, buffer) {
        if (err) {
          cb(err);
        } else {
          const dest = `${imageDestinationPath}${config}/${name}.${extension}`
          fs.outputFileSync(dest, buffer, 'utf-8', (err) => {
            if (err) {
              return console.log(err)
            }
            console.log(dest + " file generated")
          })

        }
      });

    }, function(err) {
      if (err) {
        console.log(err)
      }
    });

    console.log('Finished generating image sizes.')
  })
}
