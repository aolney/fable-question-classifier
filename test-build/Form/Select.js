"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option$reflection = Option$reflection;
exports.select = select;
exports.Option = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Common = require("../Fulma.2.1.0/Common");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _Util = require("../fable-library.2.3.8/Util");

var react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Option = (0, _Types.declare)(function Fulma_Select_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Option = Option;

function Option$reflection() {
  return (0, _Reflection.union)("Fulma.Select.Option", [], Option, () => [["Size", [(0, _Common.Size$002EISize$reflection)()]], "is-fullwidth", "is-inline", ["is-loading", [_Reflection.bool]], ["is-focused", [_Reflection.bool]], ["is-active", [_Reflection.bool]], ["Disabled", [_Reflection.bool]], ["Color", [(0, _Common.Color$002EIColor$reflection)()]], "is-rounded", ["Props", [(0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))]], ["CustomClass", [_Reflection.string]], ["Modifiers", [(0, _Reflection.list)((0, _Common.Modifier$002EIModifier$reflection)())]]]);
}

function select(options, children) {
  const parseOptions = function parseOptions(result, option) {
    var $target$$1, state;

    switch (option.tag) {
      case 7:
        $target$$1 = 1;
        break;

      case 1:
      case 2:
      case 8:
        $target$$1 = 2;
        break;

      case 3:
        $target$$1 = 3;
        state = option.fields[0];
        break;

      case 4:
        $target$$1 = 3;
        state = option.fields[0];
        break;

      case 5:
        $target$$1 = 3;
        state = option.fields[0];
        break;

      case 6:
        $target$$1 = 3;
        state = option.fields[0];
        break;

      case 9:
        $target$$1 = 4;
        break;

      case 10:
        $target$$1 = 5;
        break;

      case 11:
        $target$$1 = 6;
        break;

      default:
        $target$$1 = 0;
    }

    switch ($target$$1) {
      case 0:
        {
          const size = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result, (0, _Common.Reflection$$$getCaseName)(size));
        }

      case 1:
        {
          const color = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result, (0, _Common.Color$$$ofColor)(color));
        }

      case 2:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result, option);
        }

      case 3:
        {
          if (state) {
            return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result, option);
          } else {
            return result;
          }
        }

      case 4:
        {
          const props = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddProps$$416C4D0B)(result, props);
        }

      case 5:
        {
          const customClass = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result, customClass);
        }

      case 6:
        {
          const modifiers = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddModifiers$$5BB435D5)(result, modifiers);
        }
    }
  };

  return (0, _Common.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7)((0, _Common.Common$002EGenericOptions$$$Parse$$9AE2F7C)(options, parseOptions, "select"), function (props$$1, children$$1) {
    return react.createElement("div", (0, _Util.createObj)(props$$1, 1), ...children$$1);
  }, children);
}