const root = require("path").join(__dirname, "..", "..");

module.exports = require("node-gyp-build")(root);

// Try to load prebuilds first
try {
  module.exports = require("node-gyp-build")(root);
} catch (error) {
  // If prebuilds fail, try loading from build directory
  try {
    module.exports = require("../../build/Release/tree_sitter_bat_binding");
  } catch (error2) {
    try {
      module.exports = require("../../build/Debug/tree_sitter_bat_binding");
    } catch (error3) {
      throw error;
    }
  }
}

try {
  module.exports.nodeTypeInfo = require("../../src/node-types.json");
} catch (_) {}
