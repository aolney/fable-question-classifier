"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = writeFile;
exports.readFile = readFile;

var fs = _interopRequireWildcard(require("fs"));

var path$$2 = _interopRequireWildcard(require("path"));

var _Array = require("./fable-library.2.3.8/Array");

var _App = require("./src/App");

var _Util = require("./fable-library.2.3.8/Util");

var _String = require("./fable-library.2.3.8/String");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

function readFile(path$$1) {
  return fs.readFileSync(path$$1, "utf8");
}

describe("Tests", function () {
  it("Classifier accuracy", function () {
    var clo1, clo1$$1;
    const filePath = path$$2.resolve("tests", "labelled-data.tsv");
    let caseTuples;
    const array = readFile(filePath).split("\n");
    caseTuples = (0, _Array.map)(function mapping(row) {
      const s = row.split("\t");
      return [s[0], s[1]];
    }, array, Array);
    const classificationTuples = (0, _Array.map)(function mapping$$1(tupledArg) {
      return [tupledArg[0], (0, _App.TokenizeTagClassify)(tupledArg[1])[0][0]];
    }, caseTuples, Array);

    const NumberCorrect = function NumberCorrect(tuples) {
      return (0, _Array.sumBy)(function projection(tupledArg$$1) {
        if ((0, _Util.equals)(tupledArg$$1[0], tupledArg$$1[1])) {
          return 1;
        } else {
          return 0;
        }
      }, tuples, {
        GetZero() {
          return 0;
        },

        Add($x$$1, $y$$2) {
          return $x$$1 + $y$$2;
        }

      });
    };

    (clo1 = (0, _String.toConsole)((0, _String.printf)("Overall accuracy is %f")), function (arg10) {
      clo1(arg10);
    })(NumberCorrect(classificationTuples) / classificationTuples.length);
    (0, _String.toConsole)((0, _String.printf)("Per category accuracy is"));
    const arr = (0, _Array.groupBy)(function projection$$1(tuple$$1) {
      return tuple$$1[0];
    }, classificationTuples, Array, {
      Equals($x$$3, $y$$4) {
        return $x$$3 === $y$$4;
      },

      GetHashCode: _Util.structuralHash
    });

    for (let idx = 0; idx <= arr.length - 1; idx++) {
      const forLoopVar = arr[idx];
      (clo1$$1 = (0, _String.toConsole)((0, _String.printf)("%s accuracy is %f")), function (arg10$$1) {
        const clo2 = clo1$$1(arg10$$1);
        return function (arg20) {
          clo2(arg20);
        };
      })(forLoopVar[0])(NumberCorrect(forLoopVar[1]) / forLoopVar[1].length);
    }
  });
});