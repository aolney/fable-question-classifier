"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = writeFile;
exports.readFile = readFile;
exports.LabeledDataRow$reflection = LabeledDataRow$reflection;
exports.LabeledDataRow$$$Create = LabeledDataRow$$$Create;
exports.LabeledDataRow = void 0;

var fs = _interopRequireWildcard(require("fs"));

var _Types = require("./fable-library.2.3.8/Types");

var _Reflection = require("./fable-library.2.3.8/Reflection");

var _Util = require("./fable-library.2.3.8/Util");

var _Array = require("./fable-library.2.3.8/Array");

var _String = require("./fable-library.2.3.8/String");

var path$$2 = _interopRequireWildcard(require("path"));

var _App = require("./src/App");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function writeFile(path, content) {
  fs.writeFileSync(path, content);
}

function readFile(path$$1) {
  return fs.readFileSync(path$$1, "utf8");
}

const LabeledDataRow = (0, _Types.declare)(function Tests_LabeledDataRow(arg1, arg2, arg3, arg4) {
  this.HumanLabel = arg1;
  this.Text = arg2;
  this.BrillTagged = arg3;
  this.OriginalishLabel = arg4;
}, _Types.Record);
exports.LabeledDataRow = LabeledDataRow;

function LabeledDataRow$reflection() {
  return (0, _Reflection.record)("Tests.LabeledDataRow", [], LabeledDataRow, () => [["HumanLabel", _Reflection.string], ["Text", _Reflection.string], ["BrillTagged", _Reflection.string], ["OriginalishLabel", _Reflection.string]]);
}

function LabeledDataRow$$$Create(a, b, c, d) {
  return new LabeledDataRow(a, b, c, d);
}

describe("Tests", function () {
  it("Classifier accuracy", function () {
    const NumberCorrect = function NumberCorrect(goldHypothesisTuples) {
      return (0, _Array.sumBy)(function projection(tupledArg) {
        if ((0, _Util.equals)(tupledArg[0], tupledArg[1])) {
          return 1;
        } else {
          return 0;
        }
      }, goldHypothesisTuples, {
        GetZero() {
          return 0;
        },

        Add($x$$1, $y$$2) {
          return $x$$1 + $y$$2;
        }

      });
    };

    const PrintResults = function PrintResults(goldHypothesisTuples$$1) {
      var clo1, clo1$$1;
      (clo1 = (0, _String.toConsole)((0, _String.printf)("Overall accuracy is %f")), function (arg10) {
        clo1(arg10);
      })(NumberCorrect(goldHypothesisTuples$$1) / goldHypothesisTuples$$1.length);
      (0, _String.toConsole)((0, _String.printf)("Per category accuracy is"));
      const arr = (0, _Array.groupBy)(function projection$$1(tuple) {
        return tuple[0];
      }, goldHypothesisTuples$$1, Array, {
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
    };

    const filePath = path$$2.resolve("tests", "labelled-data.tsv");
    let labeledRows;
    const array$$3 = (0, _Array.skip)(1, readFile(filePath).split("\n"), Array);
    labeledRows = (0, _Array.map)(function mapping(row) {
      const s = row.split("\t");
      return LabeledDataRow$$$Create(s[0], s[1], s[2], s[3]);
    }, array$$3, Array);
    const classificationTuples = (0, _Array.map)(function mapping$$1(row$$1) {
      return [row$$1, (0, _App.TokenizeTagClassify)(row$$1.Text)[0][0]];
    }, labeledRows, Array);
    (0, _String.toConsole)((0, _String.printf)("CURRENT VS HUMAN"));
    PrintResults((0, _Array.map)(function mapping$$2(tupledArg$$1) {
      return [tupledArg$$1[0].HumanLabel, tupledArg$$1[1]];
    }, classificationTuples, Array));
    (0, _String.toConsole)((0, _String.printf)("ORIGINALISH VS HUMAN"));
    PrintResults((0, _Array.map)(function mapping$$3(tupledArg$$2) {
      return [tupledArg$$2[0].HumanLabel, tupledArg$$2[0].OriginalishLabel];
    }, classificationTuples, Array));
    (0, _String.toConsole)((0, _String.printf)("MISSING CLASSIFICATIONS"));
    const array$$8 = classificationTuples.filter(function predicate(tupledArg$$3) {
      if (tupledArg$$3[0].HumanLabel.trim() === "") {
        return true;
      } else {
        return tupledArg$$3[1].trim() === "";
      }
    });
    array$$8.forEach(function action(tupledArg$$4) {
      var clo1$$2;
      (clo1$$2 = (0, _String.toConsole)((0, _String.printf)("%s")), function (arg10$$3) {
        clo1$$2(arg10$$3);
      })(tupledArg$$4[0].Text);
    });
  });
});