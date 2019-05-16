"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option$reflection = Option$reflection;
exports.label = label;
exports.Option = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Common = require("../Fulma.2.1.0/Common");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _FableReact = require("../Fable.React.5.2.3/Fable.React.Props");

var _Util = require("../fable-library.2.3.8/Util");

var react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Option = (0, _Types.declare)(function Fulma_Label_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Option = Option;

function Option$reflection() {
  return (0, _Reflection.union)("Fulma.Label.Option", [], Option, () => [["Size", [(0, _Common.Size$002EISize$reflection)()]], ["For", [_Reflection.string]], ["CustomClass", [_Reflection.string]], ["Props", [(0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))]], ["Modifiers", [(0, _Reflection.list)((0, _Common.Modifier$002EIModifier$reflection)())]]]);
}

function label(options, children) {
  const parseOptions = function parseOptions(result, option) {
    switch (option.tag) {
      case 1:
        {
          const htmlFor = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddProp$$7BFEDA81)(result, new _FableReact.HTMLAttr(56, "HtmlFor", htmlFor));
        }

      case 3:
        {
          const props = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddProps$$416C4D0B)(result, props);
        }

      case 2:
        {
          const customClass = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result, customClass);
        }

      case 4:
        {
          const modifiers = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddModifiers$$5BB435D5)(result, modifiers);
        }

      default:
        {
          const size = option.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result, (0, _Common.Reflection$$$getCaseName)(size));
        }
    }
  };

  return (0, _Common.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7)((0, _Common.Common$002EGenericOptions$$$Parse$$9AE2F7C)(options, parseOptions, "label"), function (props$$1, children$$1) {
    return react.createElement("label", (0, _Util.createObj)(props$$1, 1), ...children$$1);
  }, children);
}