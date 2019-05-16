"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program$002EInternal$$$withReactBatchedUsing = Program$002EInternal$$$withReactBatchedUsing;
exports.Program$002EInternal$$$withReactSynchronousUsing = Program$002EInternal$$$withReactSynchronousUsing;
exports.Program$002EInternal$$$withReactHydrateUsing = Program$002EInternal$$$withReactHydrateUsing;
exports.Program$$$withReactBatched = Program$$$withReactBatched;
exports.Program$$$withReactSynchronous = Program$$$withReactSynchronous;
exports.Program$$$withReact = Program$$$withReact;
exports.Program$$$withReactUnoptimized = Program$$$withReactUnoptimized;
exports.Program$$$withReactHydrate = Program$$$withReactHydrate;

var _program = require("../Fable.Elmish.3.0.0/program");

var _Util = require("../fable-library.2.3.8/Util");

var react$002Ddom = _interopRequireWildcard(require("react-dom"));

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function Program$002EInternal$$$withReactBatchedUsing(lazyView2With, placeholderId, program) {
  let lastRequest = null;

  const setState = function setState(model, dispatch) {
    if (lastRequest != null) {
      const r = lastRequest;
      window.cancelAnimationFrame(r);
    }

    lastRequest = window.requestAnimationFrame(function (_arg1) {
      react$002Ddom.render(lazyView2With(function (x, y) {
        return x === y;
      }, (0, _Util.uncurry)(2, (0, _program.ProgramModule$$$view)(program)), model, dispatch), document.getElementById(placeholderId));
    });
  };

  return (0, _program.ProgramModule$$$withSetState)(setState, program);
}

function Program$002EInternal$$$withReactSynchronousUsing(lazyView2With$$1, placeholderId$$1, program$$2) {
  const setState$$1 = function setState$$1(model$$1, dispatch$$1) {
    react$002Ddom.render(lazyView2With$$1(function (x$$1, y$$1) {
      return x$$1 === y$$1;
    }, (0, _Util.uncurry)(2, (0, _program.ProgramModule$$$view)(program$$2)), model$$1, dispatch$$1), document.getElementById(placeholderId$$1));
  };

  return (0, _program.ProgramModule$$$withSetState)(setState$$1, program$$2);
}

function Program$002EInternal$$$withReactHydrateUsing(lazyView2With$$2, placeholderId$$2, program$$4) {
  const setState$$2 = function setState$$2(model$$2, dispatch$$2) {
    react$002Ddom.hydrate(lazyView2With$$2(function (x$$2, y$$2) {
      return x$$2 === y$$2;
    }, (0, _Util.uncurry)(2, (0, _program.ProgramModule$$$view)(program$$4)), model$$2, dispatch$$2), document.getElementById(placeholderId$$2));
  };

  return (0, _program.ProgramModule$$$withSetState)(setState$$2, program$$4);
}

function Program$$$withReactBatched(placeholderId$$3, program$$6) {
  return Program$002EInternal$$$withReactBatchedUsing(_common.Common$$$lazyView2With, placeholderId$$3, program$$6);
}

function Program$$$withReactSynchronous(placeholderId$$4, program$$7) {
  return Program$002EInternal$$$withReactSynchronousUsing(_common.Common$$$lazyView2With, placeholderId$$4, program$$7);
}

function Program$$$withReact(placeholderId$$5, program$$8) {
  return Program$002EInternal$$$withReactBatchedUsing(_common.Common$$$lazyView2With, placeholderId$$5, program$$8);
}

function Program$$$withReactUnoptimized(placeholderId$$6, program$$9) {
  return Program$002EInternal$$$withReactSynchronousUsing(_common.Common$$$lazyView2With, placeholderId$$6, program$$9);
}

function Program$$$withReactHydrate(placeholderId$$7, program$$10) {
  return Program$002EInternal$$$withReactHydrateUsing(_common.Common$$$lazyView2With, placeholderId$$7, program$$10);
}