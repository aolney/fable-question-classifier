"use strict";

var _App = require("./src/App");

var _Seq = require("./fable-library.2.3.8/Seq");

var _Util = require("./fable-library.2.3.8/Util");

describe("my tests", function () {
  it("calls App.randomFeature() successfully", function () {
    var source;
    (0, _Util.assertEqual)(true, (source = (0, _App.randomFeature)(), (0, _Seq.sum)(source, {
      GetZero() {
        return 0;
      },

      Add($x$$1, $y$$2) {
        return $x$$1 + $y$$2;
      }

    })) === 6);
  });
});