"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reflection$$$getCaseName = Reflection$$$getCaseName;
exports.Reflection$$$getCaseTag = Reflection$$$getCaseTag;
exports.Screen$reflection = Screen$reflection;
exports.Screen$$$ToString$$2D2414B4 = Screen$$$ToString$$2D2414B4;
exports.Color$002EIColor$reflection = Color$002EIColor$reflection;
exports.Color$$$ofColor = Color$$$ofColor;
exports.Size$002EISize$reflection = Size$002EISize$reflection;
exports.TextSize$002EOption$reflection = TextSize$002EOption$reflection;
exports.TextSize$002EOption$$$ToString$$Z2E0B9453 = TextSize$002EOption$$$ToString$$Z2E0B9453;
exports.TextAlignment$002EOption$reflection = TextAlignment$002EOption$reflection;
exports.TextWeight$002EOption$reflection = TextWeight$002EOption$reflection;
exports.TextTransform$002EOption$reflection = TextTransform$002EOption$reflection;
exports.Display$002EOption$reflection = Display$002EOption$reflection;
exports.Display$$$toDisplayClass = Display$$$toDisplayClass;
exports.Display$$$toDisplayOnlyClass = Display$$$toDisplayOnlyClass;
exports.Modifier$$$ofBackground = Modifier$$$ofBackground;
exports.Modifier$$$ofText = Modifier$$$ofText;
exports.Modifier$$$ofInvisible = Modifier$$$ofInvisible;
exports.Modifier$$$ofHidden = Modifier$$$ofHidden;
exports.Modifier$$$ofInvisibleOnly = Modifier$$$ofInvisibleOnly;
exports.Modifier$$$ofHiddenOnly = Modifier$$$ofHiddenOnly;
exports.Modifier$002EIModifier$reflection = Modifier$002EIModifier$reflection;
exports.Modifier$$$parseModifiers = Modifier$$$parseModifiers;
exports.Common$002EGenericOption$reflection = Common$002EGenericOption$reflection;
exports.Common$002EGenericOptions$reflection = Common$002EGenericOptions$reflection;
exports.Common$002EGenericOptions$$$get_Empty = Common$002EGenericOptions$$$get_Empty;
exports.Common$002EGenericOptions$$$Parse$$9AE2F7C = Common$002EGenericOptions$$$Parse$$9AE2F7C;
exports.Common$002EGenericOptions$$AddProp$$7BFEDA81 = Common$002EGenericOptions$$AddProp$$7BFEDA81;
exports.Common$002EGenericOptions$$AddProps$$416C4D0B = Common$002EGenericOptions$$AddProps$$416C4D0B;
exports.Common$002EGenericOptions$$AddClass$$Z721C83C5 = Common$002EGenericOptions$$AddClass$$Z721C83C5;
exports.Common$002EGenericOptions$$RemoveClass$$Z721C83C5 = Common$002EGenericOptions$$RemoveClass$$Z721C83C5;
exports.Common$002EGenericOptions$$AddCaseName$$1505 = Common$002EGenericOptions$$AddCaseName$$1505;
exports.Common$002EGenericOptions$$AddModifiers$$5BB435D5 = Common$002EGenericOptions$$AddModifiers$$5BB435D5;
exports.Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7 = Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7;
exports.Common$002EGenericOptions$$ToReactElement$$Z46A53D36 = Common$002EGenericOptions$$ToReactElement$$Z46A53D36;
exports.Common$$$parseOptions = Common$$$parseOptions;
exports.Common$002EHelpers$$$classes = Common$002EHelpers$$$classes;
exports.Text$$$p = Text$$$p;
exports.Text$$$div = Text$$$div;
exports.Text$$$span = Text$$$span;
exports.Common$002EGenericOptions = exports.Common$002EGenericOption = exports.Modifier$002EIModifier = exports.Display$002EOption = exports.TextTransform$002EOption = exports.TextWeight$002EOption = exports.TextAlignment$002EOption = exports.TextSize$002EOption = exports.Size$002EISize = exports.Color$002EIColor = exports.Screen = void 0;

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _Types = require("../fable-library.2.3.8/Types");

var _Util = require("../fable-library.2.3.8/Util");

var _List = require("../fable-library.2.3.8/List");

var _Option = require("../fable-library.2.3.8/Option");

var _FableReact = require("../Fable.React.5.2.3/Fable.React.Props");

var _String = require("../fable-library.2.3.8/String");

var react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function Reflection$$$getCaseName(case$) {
  return (0, _Reflection.getCaseName)(case$);
}

function Reflection$$$getCaseTag(case$$$1) {
  return (0, _Reflection.getCaseTag)(case$$$1);
}

const Screen = (0, _Types.declare)(function Fulma_Screen(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Screen = Screen;

function Screen$reflection() {
  return (0, _Reflection.union)("Fulma.Screen", [], Screen, () => ["All", "desktop", "tablet", "mobile", "widescreen", "touch", "fullhd"]);
}

function Screen$$$ToString$$2D2414B4(screen) {
  switch (screen.tag) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      {
        return "-" + Reflection$$$getCaseName(screen);
      }

    default:
      {
        return "";
      }
  }
}

const Color$002EIColor = (0, _Types.declare)(function Fulma_Color_IColor(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Color$002EIColor = Color$002EIColor;

function Color$002EIColor$reflection() {
  return (0, _Reflection.union)("Fulma.Color.IColor", [], Color$002EIColor, () => ["is-black", "is-dark", "is-light", "is-white", "is-primary", "is-info", "is-success", "is-warning", "is-danger", "is-link", "is-black-bis", "is-black-ter", "is-grey-darker", "is-grey-dark", "is-grey", "is-grey-light", "is-grey-lighter", "is-white-ter", "is-white-bis", ["IsCustomColor", [_Reflection.string]], "NoColor"]);
}

function Color$$$ofColor(level) {
  switch (level.tag) {
    case 19:
      {
        const color = level.fields[0];
        return "is-" + color;
      }

    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      {
        return Reflection$$$getCaseName(level);
      }

    default:
      {
        return "";
      }
  }
}

const Size$002EISize = (0, _Types.declare)(function Fulma_Size_ISize(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Size$002EISize = Size$002EISize;

function Size$002EISize$reflection() {
  return (0, _Reflection.union)("Fulma.Size.ISize", [], Size$002EISize, () => ["is-small", "is-medium", "is-large"]);
}

const TextSize$002EOption = (0, _Types.declare)(function Fulma_TextSize_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.TextSize$002EOption = TextSize$002EOption;

function TextSize$002EOption$reflection() {
  return (0, _Reflection.union)("Fulma.TextSize.Option", [], TextSize$002EOption, () => ["Is1", "Is2", "Is3", "Is4", "Is5", "Is6", "Is7"]);
}

function TextSize$002EOption$$$ToString$$Z2E0B9453(x) {
  return (0, _Util.int32ToString)(Reflection$$$getCaseTag(x) + 1);
}

const TextAlignment$002EOption = (0, _Types.declare)(function Fulma_TextAlignment_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.TextAlignment$002EOption = TextAlignment$002EOption;

function TextAlignment$002EOption$reflection() {
  return (0, _Reflection.union)("Fulma.TextAlignment.Option", [], TextAlignment$002EOption, () => ["has-text-centered", "has-text-justified", "has-text-left", "has-text-right"]);
}

const TextWeight$002EOption = (0, _Types.declare)(function Fulma_TextWeight_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.TextWeight$002EOption = TextWeight$002EOption;

function TextWeight$002EOption$reflection() {
  return (0, _Reflection.union)("Fulma.TextWeight.Option", [], TextWeight$002EOption, () => ["has-text-weight-light", "has-text-weight-normal", "has-text-weight-semi-bold", "has-text-weight-bold"]);
}

const TextTransform$002EOption = (0, _Types.declare)(function Fulma_TextTransform_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.TextTransform$002EOption = TextTransform$002EOption;

function TextTransform$002EOption$reflection() {
  return (0, _Reflection.union)("Fulma.TextTransform.Option", [], TextTransform$002EOption, () => ["is-capitalized", "is-lowercase", "is-uppercase", "is-italic"]);
}

const Display$002EOption = (0, _Types.declare)(function Fulma_Display_Option(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Display$002EOption = Display$002EOption;

function Display$002EOption$reflection() {
  return (0, _Reflection.union)("Fulma.Display.Option", [], Display$002EOption, () => ["block", "flex", "inline", "inline-block", "inline-flex"]);
}

function Display$$$toDisplayClass(screen$$1, display) {
  const display$$1 = Reflection$$$getCaseName(display);
  const screen$$2 = Screen$$$ToString$$2D2414B4(screen$$1);
  return "is-" + display$$1 + screen$$2;
}

function Display$$$toDisplayOnlyClass(screen$$3, display$$2) {
  switch (screen$$3.tag) {
    case 2:
    case 1:
    case 4:
      {
        const display$$3 = Reflection$$$getCaseName(display$$2);
        const screen$$4 = Screen$$$ToString$$2D2414B4(screen$$3);
        return "is-" + display$$3 + screen$$4 + "-only";
      }

    default:
      {
        const x$$1 = screen$$3;
        console.warn("Screen `%s` does not support display only." + String(x$$1));
        return "";
      }
  }
}

function Modifier$$$ofBackground(level$$1) {
  switch (level$$1.tag) {
    case 19:
      {
        const color$$1 = level$$1.fields[0];
        return "has-background-" + color$$1;
      }

    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      {
        return "has-background-" + Reflection$$$getCaseName(level$$1).slice(3, Reflection$$$getCaseName(level$$1).length);
      }

    default:
      {
        return "";
      }
  }
}

function Modifier$$$ofText(level$$2) {
  switch (level$$2.tag) {
    case 19:
      {
        const color$$2 = level$$2.fields[0];
        return "has-text-" + color$$2;
      }

    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      {
        return "has-text-" + Reflection$$$getCaseName(level$$2).slice(3, Reflection$$$getCaseName(level$$2).length);
      }

    default:
      {
        return "";
      }
  }
}

function Modifier$$$ofInvisible(screen$$5) {
  return "is-invisible" + Screen$$$ToString$$2D2414B4(screen$$5);
}

function Modifier$$$ofHidden(screen$$6) {
  return "is-hidden" + Screen$$$ToString$$2D2414B4(screen$$6);
}

function Modifier$$$ofInvisibleOnly(screen$$7) {
  switch (screen$$7.tag) {
    case 2:
    case 1:
    case 4:
      {
        return "is-invisible" + Screen$$$ToString$$2D2414B4(screen$$7) + "-only";
      }

    default:
      {
        const x$$2 = screen$$7;
        console.warn("Screen `%s` does not support `is-invisible-xxx-only`." + String(x$$2));
        return "";
      }
  }
}

function Modifier$$$ofHiddenOnly(screen$$8) {
  switch (screen$$8.tag) {
    case 2:
    case 1:
    case 4:
      {
        return "is-hidden" + Screen$$$ToString$$2D2414B4(screen$$8) + "-only";
      }

    default:
      {
        const x$$3 = screen$$8;
        console.warn("Screen `%s` does not support `is-hidden-xxx-only`." + String(x$$3));
        return "";
      }
  }
}

const Modifier$002EIModifier = (0, _Types.declare)(function Fulma_Modifier_IModifier(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Modifier$002EIModifier = Modifier$002EIModifier;

function Modifier$002EIModifier$reflection() {
  return (0, _Reflection.union)("Fulma.Modifier.IModifier", [], Modifier$002EIModifier, () => [["BackgroundColor", [Color$002EIColor$reflection()]], ["TextColor", [Color$002EIColor$reflection()]], ["TextWeight", [TextWeight$002EOption$reflection()]], ["TextSize", [Screen$reflection(), TextSize$002EOption$reflection()]], ["TextSizeOnly", [Screen$reflection(), TextSize$002EOption$reflection()]], ["TextAlignment", [Screen$reflection(), TextAlignment$002EOption$reflection()]], ["TextAlignmentOnly", [Screen$reflection(), TextAlignment$002EOption$reflection()]], ["TextTransform", [TextTransform$002EOption$reflection()]], ["Display", [Screen$reflection(), Display$002EOption$reflection()]], ["DisplayOnly", [Screen$reflection(), Display$002EOption$reflection()]], "is-clearfix", "is-pulled-left", "is-pulled-right", "is-marginless", "is-paddingless", "is-overlay", "is-clipped", "is-radiusless", "is-shadowless", "is-unselectable", ["IsInvisible", [Screen$reflection(), _Reflection.bool]], ["IsHidden", [Screen$reflection(), _Reflection.bool]], ["IsInvisibleOnly", [Screen$reflection(), _Reflection.bool]], ["IsHiddenOnly", [Screen$reflection(), _Reflection.bool]], "IsSrOnly", "IsScreenReaderOnly"]);
}

function Modifier$$$parseModifiers(options) {
  var state;

  const parseOptions = function parseOptions(result, option) {
    var x$$4, x$$5;

    switch (option.tag) {
      case 1:
        {
          const color$$4 = option.fields[0];
          return new _Types.List(Modifier$$$ofText(color$$4), result);
        }

      case 2:
        {
          const textWeight = option.fields[0];
          return new _Types.List(Reflection$$$getCaseName(textWeight), result);
        }

      case 3:
        {
          const size = option.fields[1];
          const screen$$9 = option.fields[0];
          return new _Types.List("is-size-" + TextSize$002EOption$$$ToString$$Z2E0B9453(size) + Screen$$$ToString$$2D2414B4(screen$$9), result);
        }

      case 4:
        {
          const size$$2 = option.fields[1];
          const screen$$11 = option.fields[0];
          return new _Types.List(screen$$11.tag === 2 ? "is-size-" + TextSize$002EOption$$$ToString$$Z2E0B9453(size$$2) + Screen$$$ToString$$2D2414B4(screen$$11) + "-only" : screen$$11.tag === 1 ? "is-size-" + TextSize$002EOption$$$ToString$$Z2E0B9453(size$$2) + Screen$$$ToString$$2D2414B4(screen$$11) + "-only" : screen$$11.tag === 4 ? "is-size-" + TextSize$002EOption$$$ToString$$Z2E0B9453(size$$2) + Screen$$$ToString$$2D2414B4(screen$$11) + "-only" : (x$$4 = screen$$11, (console.warn("Screen `%s` does not support `is-size-xxx-only`." + String(x$$4)), "")), result);
        }

      case 5:
        {
          const size$$4 = option.fields[1];
          const screen$$13 = option.fields[0];
          return new _Types.List(Reflection$$$getCaseName(size$$4) + Screen$$$ToString$$2D2414B4(screen$$13), result);
        }

      case 6:
        {
          const size$$5 = option.fields[1];
          const screen$$15 = option.fields[0];
          return new _Types.List(screen$$15.tag === 2 ? Reflection$$$getCaseName(size$$5) + Screen$$$ToString$$2D2414B4(screen$$15) + "-only" : screen$$15.tag === 1 ? Reflection$$$getCaseName(size$$5) + Screen$$$ToString$$2D2414B4(screen$$15) + "-only" : screen$$15.tag === 4 ? Reflection$$$getCaseName(size$$5) + Screen$$$ToString$$2D2414B4(screen$$15) + "-only" : (x$$5 = screen$$15, (console.warn("Screen `%s` does not support `is-size-xxx-only`." + String(x$$5)), "")), result);
        }

      case 7:
        {
          const transform = option.fields[0];
          return new _Types.List(Reflection$$$getCaseName(transform), result);
        }

      case 8:
        {
          const screen$$17 = option.fields[0];
          const display$$4 = option.fields[1];
          return new _Types.List(Display$$$toDisplayClass(screen$$17, display$$4), result);
        }

      case 9:
        {
          const screen$$18 = option.fields[0];
          const display$$5 = option.fields[1];
          return new _Types.List(Display$$$toDisplayOnlyClass(screen$$18, display$$5), result);
        }

      case 20:
        {
          const screen$$19 = option.fields[0];
          const b = option.fields[1];

          if (b) {
            return new _Types.List(Modifier$$$ofInvisible(screen$$19), result);
          } else {
            return result;
          }
        }

      case 22:
        {
          const screen$$20 = option.fields[0];
          const b$$1 = option.fields[1];

          if (b$$1) {
            return new _Types.List(Modifier$$$ofInvisibleOnly(screen$$20), result);
          } else {
            return result;
          }
        }

      case 21:
        {
          const screen$$21 = option.fields[0];
          const b$$2 = option.fields[1];

          if (b$$2) {
            return new _Types.List(Modifier$$$ofHidden(screen$$21), result);
          } else {
            return result;
          }
        }

      case 23:
        {
          const screen$$22 = option.fields[0];
          const b$$3 = option.fields[1];

          if (b$$3) {
            return new _Types.List(Modifier$$$ofHiddenOnly(screen$$22), result);
          } else {
            return result;
          }
        }

      case 24:
      case 25:
        {
          return new _Types.List("is-sr-only", result);
        }

      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
      case 19:
        {
          return new _Types.List(Reflection$$$getCaseName(option), result);
        }

      default:
        {
          const color$$3 = option.fields[0];
          return new _Types.List(Modifier$$$ofBackground(color$$3), result);
        }
    }
  };

  return (state = new _Types.List(), function (list) {
    return (0, _List.fold)(parseOptions, state, list);
  })(options);
}

const Common$002EGenericOption = (0, _Types.declare)(function Fulma_Common_GenericOption(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.Common$002EGenericOption = Common$002EGenericOption;

function Common$002EGenericOption$reflection() {
  return (0, _Reflection.union)("Fulma.Common.GenericOption", [], Common$002EGenericOption, () => [["CustomClass", [_Reflection.string]], ["Props", [(0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))]], ["Modifiers", [(0, _Reflection.list)(Modifier$002EIModifier$reflection())]]]);
}

const Common$002EGenericOptions = (0, _Types.declare)(function Fulma_Common_GenericOptions(arg1, arg2) {
  this.Props = arg1;
  this.Classes = arg2;
}, _Types.Record);
exports.Common$002EGenericOptions = Common$002EGenericOptions;

function Common$002EGenericOptions$reflection() {
  return (0, _Reflection.record)("Fulma.Common.GenericOptions", [], Common$002EGenericOptions, () => [["Props", (0, _Reflection.list)((0, _Reflection.type)("Fable.React.Props.IHTMLProp"))], ["Classes", (0, _Reflection.list)(_Reflection.string)]]);
}

function Common$002EGenericOptions$$$get_Empty() {
  return new Common$002EGenericOptions(new _Types.List(), new _Types.List());
}

function Common$002EGenericOptions$$$Parse$$9AE2F7C(options$$1, parser, baseClass, baseProps) {
  var state$$1;
  const result$$1 = (state$$1 = Common$002EGenericOptions$$$get_Empty(), function (list$$1) {
    return (0, _List.fold)(parser, state$$1, list$$1);
  })(options$$1);
  let result$$2;

  if (baseClass == null) {
    result$$2 = result$$1;
  } else {
    const baseClass$$1 = baseClass;
    result$$2 = Common$002EGenericOptions$$AddClass$$Z721C83C5(result$$1, baseClass$$1);
  }

  if (baseProps == null) {
    return result$$2;
  } else {
    const baseProps$$1 = baseProps;
    return Common$002EGenericOptions$$AddProps$$416C4D0B(result$$2, baseProps$$1);
  }
}

function Common$002EGenericOptions$$AddProp$$7BFEDA81(this$, prop) {
  return new Common$002EGenericOptions(new _Types.List(prop, this$.Props), this$.Classes);
}

function Common$002EGenericOptions$$AddProps$$416C4D0B(this$$$1, props) {
  return new Common$002EGenericOptions((0, _List.append)(props, this$$$1.Props), this$$$1.Classes);
}

function Common$002EGenericOptions$$AddClass$$Z721C83C5(this$$$2, cl) {
  return new Common$002EGenericOptions(this$$$2.Props, new _Types.List(cl, this$$$2.Classes));
}

function Common$002EGenericOptions$$RemoveClass$$Z721C83C5(this$$$3, cl$$1) {
  const classes = (0, _List.filter)(function predicate(cls) {
    return cls !== cl$$1;
  }, this$$$3.Classes);
  return new Common$002EGenericOptions(this$$$3.Props, classes);
}

function Common$002EGenericOptions$$AddCaseName$$1505(this$$$4, case$$$2) {
  return Common$002EGenericOptions$$AddClass$$Z721C83C5(this$$$4, Reflection$$$getCaseName(case$$$2));
}

function Common$002EGenericOptions$$AddModifiers$$5BB435D5(this$$$5, modifiers) {
  return new Common$002EGenericOptions(this$$$5.Props, (0, _List.append)(Modifier$$$parseModifiers(modifiers), this$$$5.Classes));
}

function Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7(this$$$6, el, children) {
  const children$$1 = (0, _Option.defaultArg)(children, new _Types.List());
  const classes$$1 = new _FableReact.HTMLAttr(24, "ClassName", (0, _String.join)(" ", ...this$$$6.Classes));
  return el(new _Types.List(classes$$1, this$$$6.Props), children$$1);
}

function Common$002EGenericOptions$$ToReactElement$$Z46A53D36(this$$$7, el$$1) {
  const classes$$2 = new _FableReact.HTMLAttr(24, "ClassName", (0, _String.join)(" ", ...this$$$7.Classes));
  return el$$1(new _Types.List(classes$$2, this$$$7.Props));
}

function Common$$$parseOptions(result$$3, option$$1) {
  switch (option$$1.tag) {
    case 0:
      {
        const customClass = option$$1.fields[0];
        return Common$002EGenericOptions$$AddClass$$Z721C83C5(result$$3, customClass);
      }

    case 2:
      {
        const modifiers$$1 = option$$1.fields[0];
        return Common$002EGenericOptions$$AddModifiers$$5BB435D5(result$$3, modifiers$$1);
      }

    default:
      {
        const props$$1 = option$$1.fields[0];
        return Common$002EGenericOptions$$AddProps$$416C4D0B(result$$3, props$$1);
      }
  }
}

function Common$002EHelpers$$$classes(std, options$$3, booleans) {
  const std$$1 = (0, _List.fold)(function folder(complete, option$$2) {
    if (option$$2 == null) {
      return complete;
    } else {
      const name = option$$2;
      return complete + " " + name;
    }
  }, std, options$$3);
  return new _FableReact.HTMLAttr(24, "ClassName", (0, _List.fold)(function folder$$1(complete$$1, tupledArg) {
    if (tupledArg[1]) {
      return complete$$1 + " " + tupledArg[0];
    } else {
      return complete$$1;
    }
  }, std$$1, booleans));
}

function Text$$$p(options$$4, children$$2) {
  return Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7(Common$002EGenericOptions$$$Parse$$9AE2F7C(options$$4, Common$$$parseOptions), function (props$$2, children$$3) {
    return react.createElement("p", (0, _Util.createObj)(props$$2, 1), ...children$$3);
  }, children$$2);
}

function Text$$$div(options$$5, children$$6) {
  return Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7(Common$002EGenericOptions$$$Parse$$9AE2F7C(options$$5, Common$$$parseOptions), function (props$$5, children$$7) {
    return react.createElement("div", (0, _Util.createObj)(props$$5, 1), ...children$$7);
  }, children$$6);
}

function Text$$$span(options$$6, children$$10) {
  return Common$002EGenericOptions$$ToReactElement$$Z6D3CD4B7(Common$002EGenericOptions$$$Parse$$9AE2F7C(options$$6, Common$$$parseOptions), function (props$$8, children$$11) {
    return react.createElement("span", (0, _Util.createObj)(props$$8, 1), ...children$$11);
  }, children$$10);
}