"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option$reflection = Option$reflection;
exports.controlView = controlView;
exports.div = div;
exports.p = p;
exports.Option = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _Common = require("../Fulma.2.1.0/Common");

var _Util = require("../fable-library.2.3.8/Util");

var react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Option = (0, _Types.declare)(function Fulma_Control_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Option = Option;

function Option$reflection() {
  return (0, _Reflection.union)("Fulma.Control.Option", [], Option, () => ["has-icons-right", "has-icons-left", ["is-loading", [_Reflection.bool]], "is-expanded", ["CustomClass", [_Reflection.string]], ["Props", [(0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))]], ["Modifiers", [(0, _Reflection.list)((0, _Common.Modifier$002EIModifier$reflection)())]]]);
}

function controlView(element, options, children) {
  const parseOptions = function parseOptions(result, option) {
    switch (option.tag) {
      case 1:
      case 3:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result, option);
        }

      case 2:
        {
          const state = option.fields[0];

          if (state) {
            return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result, option);
          } else {
            return result;
          }
        }

      case 5:
        {
          const props = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddProps$$416C4D0B)(result, props);
        }

      case 4:
        {
          const customClass = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result, customClass);
        }

      case 6:
        {
          const modifiers = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddModifiers$$5BB435D5)(result, modifiers);
        }

      default:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result, option);
        }
    }
  };

  return (0, _Common.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7)((0, _Common.Common$002EGenericOptions$$$Parse$$9AE2F7C)(options, parseOptions, "control"), element, children);
}

function div(x, y) {
  return controlView(function (props$$1, children$$1) {
    return react.createElement("div", (0, _Util.createObj)(props$$1, 1), ...children$$1);
  }, x, y);
}

function p(x$$1, y$$1) {
  return controlView(function (props$$4, children$$4) {
    return react.createElement("p", (0, _Util.createObj)(props$$4, 1), ...children$$4);
  }, x$$1, y$$1);
}