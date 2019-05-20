"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomFeature = randomFeature;
exports.Mode$reflection = Mode$reflection;
exports.Model$reflection = Model$reflection;
exports.Msg$reflection = Msg$reflection;
exports.init = init;
exports.TokenizeTag = TokenizeTag;
exports.TokenizeTagClassify = TokenizeTagClassify;
exports.update = update;
exports.simpleButton = simpleButton;
exports.view = view;
exports.Msg = exports.Model = exports.Mode = exports.tagger = exports.rules = exports.lexicon = exports.wordTokenizer = exports.sentenceTokenizer = void 0;

var _List = require("../fable-library.2.3.8/List");

var natural = _interopRequireWildcard(require("natural"));

var _Types = require("../fable-library.2.3.8/Types");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _Array = require("../fable-library.2.3.8/Array");

var _String = require("../fable-library.2.3.8/String");

var _QuestionClassifier = require("./QuestionClassifier");

var _Seq = require("../fable-library.2.3.8/Seq");

var _Encode = require("../Thoth.Json.3.1.0/Encode");

var _FableReact = require("../Fable.React.5.2.3/Fable.React.Props");

var _Util = require("../fable-library.2.3.8/Util");

var react = _interopRequireWildcard(require("react"));

var _Label = require("../Form/Label");

var _Select = require("../Form/Select");

var _Control = require("../Form/Control");

var _Field = require("../Form/Field");

var _program = require("../Fable.Elmish.3.0.0/program");

var _react2 = require("../Fable.Elmish.React.3.0.1/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function randomFeature() {
  return (0, _List.ofArray)([1, 2, 3]);
}

const sentenceTokenizer = new natural.SentenceTokenizer();
exports.sentenceTokenizer = sentenceTokenizer;
const wordTokenizer = new natural.WordPunctTokenizer();
exports.wordTokenizer = wordTokenizer;
const lexicon = new natural.Lexicon("EN", "N");
exports.lexicon = lexicon;
const rules = new natural.RuleSet("EN");
exports.rules = rules;
const tagger = new natural.BrillPOSTagger(lexicon, rules);
exports.tagger = tagger;
const Mode = (0, _Types.declare)(function App_Mode(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Mode = Mode;

function Mode$reflection() {
  return (0, _Reflection.union)("App.Mode", [], Mode, () => ["FreeText", "TagOnly", "TabDelimited"]);
}

const Model = (0, _Types.declare)(function App_Model(arg1, arg2, arg3) {
  this.Input = arg1;
  this.Output = arg2;
  this.Mode = arg3;
}, _Types.Record);
exports.Model = Model;

function Model$reflection() {
  return (0, _Reflection.record)("App.Model", [], Model, () => [["Input", _Reflection.string], ["Output", _Reflection.string], ["Mode", Mode$reflection()]]);
}

const Msg = (0, _Types.declare)(function App_Msg(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Msg = Msg;

function Msg$reflection() {
  return (0, _Reflection.union)("App.Msg", [], Msg, () => ["ProcessInput", ["ModeChange", [Mode$reflection()]], ["UpdateInput", [_Reflection.string]]]);
}

function init() {
  return [new Model("Whom did you ask? Did you ever have a reason to think that the sandwhich which you compared to a lemming might know how to test or assess the characteristic frequency of an unladen swallow? Shouldn't you guess? Don't you think you haven't? Won't you at least try? What was its name? Why do you think that?", "", new Mode(0, "FreeText")), new _Types.List()];
}

function TokenizeTag(text) {
  const array$$1 = sentenceTokenizer.tokenize(text + " ");
  return (0, _Array.map)(function mapping$$1(s) {
    const taggedSentence = tagger.tag(wordTokenizer.tokenize(s));
    const flatTaggedSentence = (0, _String.join)(" ", ...(0, _Array.map)(function mapping(tw) {
      return tw.token + "/" + tw.tag;
    }, taggedSentence.taggedWords, Array));
    return flatTaggedSentence;
  }, array$$1, Array);
}

function TokenizeTagClassify(classificationMode, indirectQuestionMode, text$$1) {
  const array$$2 = TokenizeTag(text$$1);
  return (0, _Array.map)(function mapping$$2(s$$1) {
    const patternInput = (0, _QuestionClassifier.Classify)(classificationMode, indirectQuestionMode, s$$1);
    return [patternInput[0], patternInput[1]];
  }, array$$2, Array);
}

function update(msg, model) {
  switch (msg.tag) {
    case 2:
      {
        const input = msg.fields[0];
        return [new Model(input, model.Output, model.Mode), new _Types.List()];
      }

    case 0:
      {
        const TabbedInput = function TabbedInput(text$$3) {
          let rowCols;
          const array$$3 = model.Input.split("\n");
          rowCols = (0, _Array.map)(function mapping$$3(row) {
            return row.split("\t");
          }, array$$3, Array);
          const inputRows = (0, _Seq.map)(_Array.last, rowCols);
          return inputRows;
        };

        let output;

        if (model.Mode.tag === 1) {
          const x$$2 = TokenizeTag(model.Input);
          output = (0, _Encode.Auto$$$toString$$59982D9A)(0, x$$2, null, null, {
            ResolveType() {
              return (0, _Reflection.array)(_Reflection.string);
            }

          });
        } else if (model.Mode.tag === 2) {
          const x$$4 = TabbedInput(model.Input);
          output = (0, _Encode.Auto$$$toString$$59982D9A)(0, x$$4, null, null, {
            ResolveType() {
              return (0, _Reflection.type)("System.Collections.Generic.IEnumerable`1", [_Reflection.string]);
            }

          });
        } else {
          const x = TokenizeTagClassify(new _QuestionClassifier.ClassificationMode(0, "Monothetic"), new _QuestionClassifier.IndirectQuestionMode(1, "IsOff"), model.Input);
          output = (0, _Encode.Auto$$$toString$$59982D9A)(0, x, null, null, {
            ResolveType() {
              return (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.array)((0, _Reflection.tuple)(_Reflection.string, _Reflection.int32))));
            }

          });
        }

        return [new Model(model.Input, output, model.Mode), new _Types.List()];
      }

    default:
      {
        const newMode = msg.fields[0];
        return [new Model(model.Input, model.Output, newMode), new _Types.List()];
      }
  }
}

function simpleButton(txt, action, dispatch) {
  const props$$2 = [new _FableReact.HTMLAttr(24, "ClassName", "column is-narrow")];
  return react.createElement("div", (0, _Util.createObj)(props$$2, 1), ...[react.createElement("a", {
    className: "button",
    onClick: function (_arg1) {
      dispatch(action);
    }
  }, ...[txt])]);
}

function view(model$$1, dispatch$$1) {
  var props$$22, props$$20;
  const props$$24 = [new _FableReact.HTMLAttr(24, "ClassName", "columns is-vcentered")];
  return react.createElement("div", (0, _Util.createObj)(props$$24, 1), ...[(props$$22 = [new _FableReact.HTMLAttr(24, "ClassName", "column")], react.createElement("div", (0, _Util.createObj)(props$$22, 1), ...[react.createElement("h1", {
    className: "title"
  }, ...["Question Classifier"]), (0, _Field.div)(new _Types.List(), (0, _List.ofArray)([(0, _Label.label)(new _Types.List(), new _Types.List("Mode", new _Types.List())), (0, _Control.div)(new _Types.List(), new _Types.List((0, _Select.select)(new _Types.List(new _Select.Option(9, "Props", new _Types.List(new _FableReact.DOMAttr(40, "OnClick", function (ev) {
    dispatch$$1(new Msg(1, "ModeChange", ev.target.value));
  }), new _Types.List())), new _Types.List()), new _Types.List(react.createElement("select", {
    defaultValue: model$$1.Mode
  }, ...[react.createElement("option", {
    value: new Mode(0, "FreeText")
  }, ...["Free text"]), react.createElement("option", {
    value: new Mode(2, "TabDelimited")
  }, ...["Tab delimited"]), react.createElement("option", {
    value: new Mode(1, "TagOnly")
  }, ...["Tag only"])]), new _Types.List())), new _Types.List()))])), (props$$20 = [new _FableReact.HTMLAttr(24, "ClassName", "content")], react.createElement("div", (0, _Util.createObj)(props$$20, 1), ...[react.createElement("p", {}, ...["Enter your text here. In Free text mode, sentences will be tokenized using simple punctuation and individually classified. In Tab delimited mode, it will be treated as tab delimited with the last column as text input."]), react.createElement("textarea", (0, _Util.createObj)([new _FableReact.HTMLAttr(24, "ClassName", "input"), new _FableReact.HTMLAttr(1, "DefaultValue", model$$1.Input), new _FableReact.HTMLAttr(105, "Size", 100000), ["style", {
    width: "100%",
    height: "600px"
  }], new _FableReact.DOMAttr(10, "OnInput", function (ev$$1) {
    dispatch$$1(new Msg(2, "UpdateInput", ev$$1.target.value));
  })], 1), ...[]), simpleButton("Go", new Msg(0, "ProcessInput"), dispatch$$1), react.createElement("p", {}, ...["Your results appear here."]), model$$1.Output]))]))]);
}

(0, _program.ProgramModule$$$run)((0, _react2.Program$$$withReactBatched)("elmish-app", (0, _program.ProgramModule$$$mkProgram)(function () {
  return init();
}, update, view)));