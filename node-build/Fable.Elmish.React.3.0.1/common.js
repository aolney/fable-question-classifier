"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LazyProps$00601$reflection = LazyProps$00601$reflection;
exports.Components$002ELazyView$00601$reflection = Components$002ELazyView$00601$reflection;
exports.Components$002ELazyView$00601$$$$002Ector$$Z7829D94B = Components$002ELazyView$00601$$$$002Ector$$Z7829D94B;
exports.Common$$$lazyViewWith = Common$$$lazyViewWith;
exports.Common$$$lazyView2With = Common$$$lazyView2With;
exports.Common$$$lazyView3With = Common$$$lazyView3With;
exports.Common$$$lazyView = Common$$$lazyView;
exports.Common$$$lazyView2 = Common$$$lazyView2;
exports.Common$$$lazyView3 = Common$$$lazyView3;
exports.Components$002ELazyView$00601 = exports.LazyProps$00601 = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var react = _interopRequireWildcard(require("react"));

var _Util = require("../fable-library.2.3.8/Util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const LazyProps$00601 = (0, _Types.declare)(function Elmish_React_LazyProps(arg1, arg2, arg3) {
  this.model = arg1;
  this.render = arg2;
  this.equal = arg3;
}, _Types.Record);
exports.LazyProps$00601 = LazyProps$00601;

function LazyProps$00601$reflection($gen$$2) {
  return (0, _Reflection.record)("Elmish.React.LazyProps`1", [$gen$$2], LazyProps$00601, () => [["model", $gen$$2], ["render", (0, _Reflection.lambda)(_Reflection.unit, (0, _Reflection.type)("Fable.React.ReactElement"))], ["equal", (0, _Reflection.lambda)($gen$$2, (0, _Reflection.lambda)($gen$$2, _Reflection.bool))]]);
}

const Components$002ELazyView$00601 = (0, _Types.declare)(function Elmish_React_Components_LazyView(props) {
  const $this$$1 = this;
  react.Component.call($this$$1, props);
}, react.Component);
exports.Components$002ELazyView$00601 = Components$002ELazyView$00601;

function Components$002ELazyView$00601$reflection($gen$$3) {
  return (0, _Reflection.type)("Elmish.React.Components.LazyView`1", [$gen$$3]);
}

function Components$002ELazyView$00601$$$$002Ector$$Z7829D94B(props) {
  return this instanceof Components$002ELazyView$00601 ? Components$002ELazyView$00601.call(this, props) : new Components$002ELazyView$00601(props);
}

Components$002ELazyView$00601.prototype.shouldComponentUpdate = function (nextProps, _nextState) {
  const this$ = this;
  return !this$.props.equal(this$.props.model, nextProps.model);
};

Components$002ELazyView$00601.prototype.render = function () {
  const this$$$1 = this;
  return this$$$1.props.render();
};

function Common$$$lazyViewWith(equal, view, state) {
  const props$$1 = new LazyProps$00601(state, function render() {
    return view(state);
  }, equal);
  const children = [];
  return react.createElement(Components$002ELazyView$00601, props$$1, ...children);
}

function Common$$$lazyView2With(equal$$1, view$$1, state$$1, dispatch) {
  const props$$3 = new LazyProps$00601(state$$1, function render$$1() {
    return view$$1(state$$1, dispatch);
  }, equal$$1);
  const children$$2 = [];
  return react.createElement(Components$002ELazyView$00601, props$$3, ...children$$2);
}

function Common$$$lazyView3With(equal$$2, view$$2, state1, state2, dispatch$$1) {
  const props$$5 = new LazyProps$00601([state1, state2], function render$$2() {
    return view$$2(state1, state2, dispatch$$1);
  }, equal$$2);
  const children$$4 = [];
  return react.createElement(Components$002ELazyView$00601, props$$5, ...children$$4);
}

function Common$$$lazyView(view$$3) {
  return function (state$$2) {
    return Common$$$lazyViewWith(_Util.equals, view$$3, state$$2);
  };
}

function Common$$$lazyView2(view$$4) {
  return function (state$$3) {
    return function (dispatch$$2) {
      return Common$$$lazyView2With(_Util.equals, view$$4, state$$3, dispatch$$2);
    };
  };
}

function Common$$$lazyView3(view$$5) {
  return function (state1$$1) {
    return function (state2$$1) {
      return function (dispatch$$3) {
        return Common$$$lazyView3With(_Util.equalArrays, view$$5, state1$$1, state2$$1, dispatch$$3);
      };
    };
  };
}