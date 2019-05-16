"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Program$00604$reflection = Program$00604$reflection;
exports.ProgramModule$$$mkProgram = ProgramModule$$$mkProgram;
exports.ProgramModule$$$mkSimple = ProgramModule$$$mkSimple;
exports.ProgramModule$$$withSubscription = ProgramModule$$$withSubscription;
exports.ProgramModule$$$withConsoleTrace = ProgramModule$$$withConsoleTrace;
exports.ProgramModule$$$withTrace = ProgramModule$$$withTrace;
exports.ProgramModule$$$withErrorHandler = ProgramModule$$$withErrorHandler;
exports.ProgramModule$$$mapErrorHandler = ProgramModule$$$mapErrorHandler;
exports.ProgramModule$$$withSetState = ProgramModule$$$withSetState;
exports.ProgramModule$$$setState = ProgramModule$$$setState;
exports.ProgramModule$$$view = ProgramModule$$$view;
exports.ProgramModule$$$withSyncDispatch = ProgramModule$$$withSyncDispatch;
exports.ProgramModule$$$map = ProgramModule$$$map;
exports.ProgramModule$$$runWith = ProgramModule$$$runWith;
exports.ProgramModule$$$run = ProgramModule$$$run;
exports.Program$00604 = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _cmd = require("./cmd");

var _Util = require("../fable-library.2.3.8/Util");

var _prelude = require("./prelude");

var _List = require("../fable-library.2.3.8/List");

var _ring = require("./ring");

var _Option = require("../fable-library.2.3.8/Option");

var _String = require("../fable-library.2.3.8/String");

const Program$00604 = (0, _Types.declare)(function Elmish_Program(arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
  this.init = arg1;
  this.update = arg2;
  this.subscribe = arg3;
  this.view = arg4;
  this.setState = arg5;
  this.onError = arg6;
  this.syncDispatch = arg7;
}, _Types.Record);
exports.Program$00604 = Program$00604;

function Program$00604$reflection($gen$$5, $gen$$6, $gen$$7, $gen$$8) {
  return (0, _Reflection.record)("Elmish.Program`4", [$gen$$5, $gen$$6, $gen$$7, $gen$$8], Program$00604, () => [["init", (0, _Reflection.lambda)($gen$$5, (0, _Reflection.tuple)($gen$$6, (0, _Reflection.list)((0, _Reflection.lambda)((0, _Reflection.lambda)($gen$$7, _Reflection.unit), _Reflection.unit))))], ["update", (0, _Reflection.lambda)($gen$$7, (0, _Reflection.lambda)($gen$$6, (0, _Reflection.tuple)($gen$$6, (0, _Reflection.list)((0, _Reflection.lambda)((0, _Reflection.lambda)($gen$$7, _Reflection.unit), _Reflection.unit)))))], ["subscribe", (0, _Reflection.lambda)($gen$$6, (0, _Reflection.list)((0, _Reflection.lambda)((0, _Reflection.lambda)($gen$$7, _Reflection.unit), _Reflection.unit)))], ["view", (0, _Reflection.lambda)($gen$$6, (0, _Reflection.lambda)((0, _Reflection.lambda)($gen$$7, _Reflection.unit), $gen$$8))], ["setState", (0, _Reflection.lambda)($gen$$6, (0, _Reflection.lambda)((0, _Reflection.lambda)($gen$$7, _Reflection.unit), _Reflection.unit))], ["onError", (0, _Reflection.lambda)((0, _Reflection.tuple)(_Reflection.string, (0, _Reflection.type)("System.Exception")), _Reflection.unit)], ["syncDispatch", (0, _Reflection.lambda)((0, _Reflection.lambda)($gen$$7, _Reflection.unit), (0, _Reflection.lambda)($gen$$7, _Reflection.unit))]]);
}

function ProgramModule$$$mkProgram(init, update, view) {
  return new Program$00604(init, update, function (_arg1) {
    return (0, _cmd.Cmd$$$none)();
  }, view, function setState(model, $arg$$1) {
    (0, _Util.ignore)(view(model, $arg$$1));
  }, function (tupledArg) {
    (0, _prelude.onError)(tupledArg[0], tupledArg[1]);
  }, (0, _Util.uncurry)(2, function (x) {
    return x;
  }));
}

function ProgramModule$$$mkSimple(init$$1, update$$1, view$$1) {
  return new Program$00604(function init$$2($arg$$2) {
    return [init$$1($arg$$2), (0, _cmd.Cmd$$$none)()];
  }, function update$$2(msg, $arg$$3) {
    return [update$$1(msg, $arg$$3), (0, _cmd.Cmd$$$none)()];
  }, function (_arg1$$1) {
    return (0, _cmd.Cmd$$$none)();
  }, view$$1, function setState$$1(model$$1, $arg$$4) {
    (0, _Util.ignore)(view$$1(model$$1, $arg$$4));
  }, function (tupledArg$$1) {
    (0, _prelude.onError)(tupledArg$$1[0], tupledArg$$1[1]);
  }, (0, _Util.uncurry)(2, function (x$$1) {
    return x$$1;
  }));
}

function ProgramModule$$$withSubscription(subscribe, program) {
  const sub = function sub(model$$2) {
    return (0, _cmd.Cmd$$$batch)((0, _List.ofArray)([program.subscribe(model$$2), subscribe(model$$2)]));
  };

  return new Program$00604(program.init, program.update, sub, program.view, program.setState, program.onError, program.syncDispatch);
}

function ProgramModule$$$withConsoleTrace(program$$1) {
  const traceInit = function traceInit(arg) {
    const patternInput = program$$1.init(arg);
    (0, _prelude.toConsole)("Initial state:", patternInput[0]);
    return [patternInput[0], patternInput[1]];
  };

  const traceUpdate = function traceUpdate(msg$$1, model$$3) {
    (0, _prelude.toConsole)("New message:", msg$$1);
    const patternInput$$1 = program$$1.update(msg$$1, model$$3);
    (0, _prelude.toConsole)("Updated state:", patternInput$$1[0]);
    return [patternInput$$1[0], patternInput$$1[1]];
  };

  return new Program$00604(traceInit, traceUpdate, program$$1.subscribe, program$$1.view, program$$1.setState, program$$1.onError, program$$1.syncDispatch);
}

function ProgramModule$$$withTrace(trace, program$$2) {
  return new Program$00604(program$$2.init, function update$$3(msg$$2, model$$4) {
    trace(msg$$2, model$$4);
    return program$$2.update(msg$$2, model$$4);
  }, program$$2.subscribe, program$$2.view, program$$2.setState, program$$2.onError, program$$2.syncDispatch);
}

function ProgramModule$$$withErrorHandler(onError, program$$3) {
  return new Program$00604(program$$3.init, program$$3.update, program$$3.subscribe, program$$3.view, program$$3.setState, onError, program$$3.syncDispatch);
}

function ProgramModule$$$mapErrorHandler(map, program$$4) {
  return new Program$00604(program$$4.init, program$$4.update, program$$4.subscribe, program$$4.view, program$$4.setState, (0, _Util.partialApply)(1, map, [program$$4.onError]), program$$4.syncDispatch);
}

function ProgramModule$$$withSetState(setState$$2, program$$5) {
  return new Program$00604(program$$5.init, program$$5.update, program$$5.subscribe, program$$5.view, setState$$2, program$$5.onError, program$$5.syncDispatch);
}

function ProgramModule$$$setState(program$$6) {
  return (0, _Util.curry)(2, program$$6.setState);
}

function ProgramModule$$$view(program$$7) {
  return (0, _Util.curry)(2, program$$7.view);
}

function ProgramModule$$$withSyncDispatch(syncDispatch, program$$8) {
  return new Program$00604(program$$8.init, program$$8.update, program$$8.subscribe, program$$8.view, program$$8.setState, program$$8.onError, syncDispatch);
}

function ProgramModule$$$map(mapInit, mapUpdate, mapView, mapSetState, mapSubscribe, program$$9) {
  const init$$3 = (0, _Util.partialApply)(1, mapInit, [program$$9.init]);
  const update$$4 = (0, _Util.partialApply)(2, mapUpdate, [program$$9.update]);
  const view$$2 = (0, _Util.partialApply)(2, mapView, [program$$9.view]);
  const setState$$3 = (0, _Util.partialApply)(2, mapSetState, [program$$9.setState]);
  return new Program$00604(init$$3, (0, _Util.uncurry)(2, update$$4), (0, _Util.partialApply)(1, mapSubscribe, [program$$9.subscribe]), (0, _Util.uncurry)(2, view$$2), (0, _Util.uncurry)(2, setState$$3), program$$9.onError, (0, _Util.uncurry)(2, function (x$$2) {
    return x$$2;
  }));
}

function ProgramModule$$$runWith(arg$$1, program$$10) {
  const patternInput$$2 = program$$10.init(arg$$1);
  const rb = (0, _ring.RingBuffer$00601$$$$002Ector$$Z524259A4)(10);
  let reentered = false;
  let state$$2 = patternInput$$2[0];

  const dispatch = function dispatch(msg$$3) {
    var clo1;

    if (reentered) {
      (0, _ring.RingBuffer$00601$$Push$$2B595)(rb, msg$$3);
    } else {
      reentered = true;
      let nextMsg = (0, _Option.some)(msg$$3);

      while (nextMsg != null) {
        const msg$$4 = (0, _Option.value)(nextMsg);

        try {
          const patternInput$$3 = program$$10.update(msg$$4, state$$2);
          program$$10.setState(patternInput$$3[0], syncDispatch$$1);
          (0, _cmd.Cmd$$$exec)(syncDispatch$$1, patternInput$$3[1]);
          state$$2 = patternInput$$3[0];
        } catch (ex$$2) {
          program$$10.onError([(clo1 = (0, _String.toText)((0, _String.printf)("Unable to process the message: %A")), function (arg10) {
            return clo1(arg10);
          })(msg$$4), ex$$2]);
        }

        nextMsg = (0, _ring.RingBuffer$00601$$Pop)(rb);
      }

      reentered = false;
    }
  };

  const syncDispatch$$1 = (0, _Util.partialApply)(1, program$$10.syncDispatch, [dispatch]);
  program$$10.setState(patternInput$$2[0], syncDispatch$$1);
  let sub$$1;

  try {
    sub$$1 = program$$10.subscribe(patternInput$$2[0]);
  } catch (ex$$3) {
    program$$10.onError(["Unable to subscribe:", ex$$3]);
    sub$$1 = (0, _cmd.Cmd$$$none)();
  }

  (0, _cmd.Cmd$$$exec)(syncDispatch$$1, (0, _List.append)(sub$$1, patternInput$$2[1]));
}

function ProgramModule$$$run(program$$11) {
  ProgramModule$$$runWith(null, program$$11);
}