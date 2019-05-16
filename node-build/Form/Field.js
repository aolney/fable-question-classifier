"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Option$reflection = Option$reflection;
exports.Label$002EOption$reflection = Label$002EOption$reflection;
exports.body = body;
exports.label = label;
exports.fieldView = fieldView;
exports.div = div;
exports.p = p;
exports.Label$002EOption = exports.Option = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _Common = require("../Fulma.2.1.0/Common");

var _Util = require("../fable-library.2.3.8/Util");

var react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const Option = (0, _Types.declare)(function Fulma_Field_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Option = Option;

function Option$reflection() {
  return (0, _Reflection.union)("Fulma.Field.Option", [], Option, () => ["has-addons", "has-addons-centered", "has-addons-right", "has-addons-fullwidth", "is-grouped", "is-grouped-centered", "is-grouped-right", "is-grouped-multiline", "is-horizontal", "is-expanded", ["CustomClass", [_Reflection.string]], ["Props", [(0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))]], ["Modifiers", [(0, _Reflection.list)((0, _Common.Modifier$002EIModifier$reflection)())]]]);
}

const Label$002EOption = (0, _Types.declare)(function Fulma_Field_Label_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Label$002EOption = Label$002EOption;

function Label$002EOption$reflection() {
  return (0, _Reflection.union)("Fulma.Field.Label.Option", [], Label$002EOption, () => [["Size", [(0, _Common.Size$002EISize$reflection)()]], "is-normal", ["CustomClass", [_Reflection.string]], ["Props", [(0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))]], ["Modifiers", [(0, _Reflection.list)((0, _Common.Modifier$002EIModifier$reflection)())]]]);
}

function body(options, children) {
  return (0, _Common.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7)((0, _Common.Common$002EGenericOptions$$$Parse$$9AE2F7C)(options, _Common.Common$$$parseOptions, "field-body"), function (props, children$$1) {
    return react.createElement("div", (0, _Util.createObj)(props, 1), ...children$$1);
  }, children);
}

function label(options$$1, children$$4) {
  const parseOptions = function parseOptions(result$$1, option$$1) {
    switch (option$$1.tag) {
      case 1:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result$$1, option$$1);
        }

      case 3:
        {
          const props$$3 = option$$1.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddProps$$416C4D0B)(result$$1, props$$3);
        }

      case 2:
        {
          const customClass = option$$1.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$1, customClass);
        }

      case 4:
        {
          const modifiers = option$$1.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddModifiers$$5BB435D5)(result$$1, modifiers);
        }

      default:
        {
          const size = option$$1.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$1, (0, _Common.Reflection$$$getCaseName)(size));
        }
    }
  };

  return (0, _Common.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7)((0, _Common.Common$002EGenericOptions$$$Parse$$9AE2F7C)(options$$1, parseOptions, "field-label"), function (props$$4, children$$5) {
    return react.createElement("div", (0, _Util.createObj)(props$$4, 1), ...children$$5);
  }, children$$4);
}

function fieldView(element, options$$2, children$$8) {
  const parseOptions$$1 = function parseOptions$$1(result$$2, option$$2) {
    switch (option$$2.tag) {
      case 2:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)((0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, "has-addons"), option$$2);
        }

      case 3:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)((0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, "has-addons"), option$$2);
        }

      case 5:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)((0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, "is-grouped"), option$$2);
        }

      case 6:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)((0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, "is-grouped"), option$$2);
        }

      case 7:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)((0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, "is-grouped"), option$$2);
        }

      case 0:
      case 4:
      case 8:
      case 9:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)(result$$2, option$$2);
        }

      case 11:
        {
          const props$$7 = option$$2.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddProps$$416C4D0B)(result$$2, props$$7);
        }

      case 10:
        {
          const customClass$$1 = option$$2.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, customClass$$1);
        }

      case 12:
        {
          const modifiers$$1 = option$$2.fields[0];
          return (0, _Common.Common$002EGenericOptions$$AddModifiers$$5BB435D5)(result$$2, modifiers$$1);
        }

      default:
        {
          return (0, _Common.Common$002EGenericOptions$$AddCaseName$$1505)((0, _Common.Common$002EGenericOptions$$AddClass$$Z721C83C5)(result$$2, "has-addons"), option$$2);
        }
    }
  };

  return (0, _Common.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7)((0, _Common.Common$002EGenericOptions$$$Parse$$9AE2F7C)(options$$2, parseOptions$$1, "field"), element, children$$8);
}

function div(x, y) {
  return fieldView(function (props$$8, children$$9) {
    return react.createElement("div", (0, _Util.createObj)(props$$8, 1), ...children$$9);
  }, x, y);
}

function p(x$$1, y$$1) {
  return fieldView(function (props$$11, children$$12) {
    return react.createElement("p", (0, _Util.createObj)(props$$11, 1), ...children$$12);
  }, x$$1, y$$1);
}