/**
  Constants used for image resize script
*/
const path = require('path')
const projectRoot = path.join(__dirname, '..', '..')

module.exports = {
  "concurrency": 8,
  "sizes": [
    "1920x1920",
    "1680x1680",
    "1320x1320",
    "1020x1020",
    "720x720",
    "480x480",
    "360x360",
    "20x20"
  ],
  imageSourcePath: path.join(projectRoot, 'content/assets/uploads/'),
  imageDestinationPath: path.join(projectRoot, 'content/assets/images/')
}
