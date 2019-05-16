"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cmd$$$exec = Cmd$$$exec;
exports.Cmd$$$none = Cmd$$$none;
exports.Cmd$$$map = Cmd$$$map;
exports.Cmd$$$batch = Cmd$$$batch;
exports.Cmd$$$ofSub = Cmd$$$ofSub;
exports.Cmd$002EOfFunc$$$either = Cmd$002EOfFunc$$$either;
exports.Cmd$002EOfFunc$$$perform = Cmd$002EOfFunc$$$perform;
exports.Cmd$002EOfFunc$$$attempt = Cmd$002EOfFunc$$$attempt;
exports.Cmd$002EOfFunc$$$result = Cmd$002EOfFunc$$$result;
exports.Cmd$002EOfAsync$$$either = Cmd$002EOfAsync$$$either;
exports.Cmd$002EOfAsync$$$perform = Cmd$002EOfAsync$$$perform;
exports.Cmd$002EOfAsync$$$attempt = Cmd$002EOfAsync$$$attempt;
exports.Cmd$002EOfAsync$$$result = Cmd$002EOfAsync$$$result;
exports.Cmd$002EOfPromise$$$either = Cmd$002EOfPromise$$$either;
exports.Cmd$002EOfPromise$$$perform = Cmd$002EOfPromise$$$perform;
exports.Cmd$002EOfPromise$$$attempt = Cmd$002EOfPromise$$$attempt;
exports.Cmd$002EOfPromise$$$result = Cmd$002EOfPromise$$$result;
exports.Cmd$$$attemptFunc = Cmd$$$attemptFunc;

var _List = require("../fable-library.2.3.8/List");

var _Types = require("../fable-library.2.3.8/Types");

var _Async = require("../fable-library.2.3.8/Async");

var _AsyncBuilder = require("../fable-library.2.3.8/AsyncBuilder");

var _Util = require("../fable-library.2.3.8/Util");

function Cmd$$$exec(dispatch, cmd) {
  (0, _List.iterate)(function action(sub) {
    sub(dispatch);
  }, cmd);
}

function Cmd$$$none() {
  return new _Types.List();
}

function Cmd$$$map(f, cmd$$1) {
  return (0, _List.map)(function mapping(g) {
    return function ($arg$$2) {
      g(function ($arg$$1) {
        $arg$$2(f($arg$$1));
      });
    };
  }, cmd$$1);
}

function Cmd$$$batch(cmds) {
  return (0, _List.concat)(cmds);
}

function Cmd$$$ofSub(sub$$1) {
  return new _Types.List(sub$$1, new _Types.List());
}

function Cmd$002EOfFunc$$$either(task, arg, ofSuccess, ofError) {
  const bind = function bind(dispatch$$2) {
    try {
      return dispatch$$2(ofSuccess(task(arg)));
    } catch (x) {
      return dispatch$$2(ofError(x));
    }
  };

  return new _Types.List(bind, new _Types.List());
}

function Cmd$002EOfFunc$$$perform(task$$1, arg$$1, ofSuccess$$1) {
  const bind$$1 = function bind$$1(dispatch$$3) {
    try {
      dispatch$$3(ofSuccess$$1(task$$1(arg$$1)));
    } catch (x$$1) {}
  };

  return new _Types.List(bind$$1, new _Types.List());
}

function Cmd$002EOfFunc$$$attempt(task$$2, arg$$2, ofError$$1) {
  const bind$$2 = function bind$$2(dispatch$$4) {
    try {
      task$$2(arg$$2);
    } catch (x$$2) {
      dispatch$$4(ofError$$1(x$$2));
    }
  };

  return new _Types.List(bind$$2, new _Types.List());
}

function Cmd$002EOfFunc$$$result(msg) {
  return new _Types.List(function (dispatch$$5) {
    dispatch$$5(msg);
  }, new _Types.List());
}

function Cmd$002EOfAsync$$$either(task$$3, arg$$3, ofSuccess$$2, ofError$$2) {
  const bind$$3 = function bind$$3(dispatch$$6) {
    return _AsyncBuilder.singleton.Delay(function () {
      return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(task$$3(arg$$3)), function (_arg1) {
        var x$$4, x$$3;
        const r = _arg1;
        dispatch$$6(r.tag === 1 ? (x$$4 = r.fields[0], ofError$$2(x$$4)) : (x$$3 = r.fields[0], ofSuccess$$2(x$$3)));
        return _AsyncBuilder.singleton.Zero();
      });
    });
  };

  return new _Types.List(function ($arg$$7) {
    (0, _Async.startImmediate)(bind$$3($arg$$7));
  }, new _Types.List());
}

function Cmd$002EOfAsync$$$perform(task$$4, arg$$4, ofSuccess$$3) {
  const bind$$4 = function bind$$4(dispatch$$7) {
    return _AsyncBuilder.singleton.Delay(function () {
      return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(task$$4(arg$$4)), function (_arg1$$1) {
        const r$$1 = _arg1$$1;

        if (r$$1.tag === 0) {
          const x$$5 = r$$1.fields[0];
          dispatch$$7(ofSuccess$$3(x$$5));
          return _AsyncBuilder.singleton.Zero();
        } else {
          return _AsyncBuilder.singleton.Zero();
        }
      });
    });
  };

  return new _Types.List(function ($arg$$8) {
    (0, _Async.startImmediate)(bind$$4($arg$$8));
  }, new _Types.List());
}

function Cmd$002EOfAsync$$$attempt(task$$5, arg$$5, ofError$$3) {
  const bind$$5 = function bind$$5(dispatch$$8) {
    return _AsyncBuilder.singleton.Delay(function () {
      return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(task$$5(arg$$5)), function (_arg1$$2) {
        const r$$2 = _arg1$$2;

        if (r$$2.tag === 1) {
          const x$$6 = r$$2.fields[0];
          dispatch$$8(ofError$$3(x$$6));
          return _AsyncBuilder.singleton.Zero();
        } else {
          return _AsyncBuilder.singleton.Zero();
        }
      });
    });
  };

  return new _Types.List(function ($arg$$9) {
    (0, _Async.startImmediate)(bind$$5($arg$$9));
  }, new _Types.List());
}

function Cmd$002EOfAsync$$$result(task$$6) {
  const bind$$6 = function bind$$6(dispatch$$9) {
    return _AsyncBuilder.singleton.Delay(function () {
      return _AsyncBuilder.singleton.Bind((0, _Async.catchAsync)(task$$6), function (_arg1$$3) {
        const r$$3 = _arg1$$3;

        if (r$$3.tag === 0) {
          const x$$7 = r$$3.fields[0];
          dispatch$$9(x$$7);
          return _AsyncBuilder.singleton.Zero();
        } else {
          return _AsyncBuilder.singleton.Zero();
        }
      });
    });
  };

  return new _Types.List(function ($arg$$10) {
    (0, _Async.startImmediate)(bind$$6($arg$$10));
  }, new _Types.List());
}

function Cmd$002EOfPromise$$$either(task$$7, arg$$6, ofSuccess$$4, ofError$$4) {
  const bind$$7 = function bind$$7(dispatch$$10) {
    (0, _Util.ignore)(task$$7(arg$$6).then(function ($arg$$11) {
      return dispatch$$10(ofSuccess$$4($arg$$11));
    }).catch(function ($arg$$13) {
      return dispatch$$10(ofError$$4($arg$$13));
    }));
  };

  return new _Types.List(bind$$7, new _Types.List());
}

function Cmd$002EOfPromise$$$perform(task$$8, arg$$7, ofSuccess$$5) {
  const bind$$8 = function bind$$8(dispatch$$11) {
    (0, _Util.ignore)(task$$8(arg$$7).then(function ($arg$$14) {
      return dispatch$$11(ofSuccess$$5($arg$$14));
    }));
  };

  return new _Types.List(bind$$8, new _Types.List());
}

function Cmd$002EOfPromise$$$attempt(task$$9, arg$$8, ofError$$5) {
  const bind$$9 = function bind$$9(dispatch$$12) {
    (0, _Util.ignore)(task$$9(arg$$8).catch(function ($arg$$16) {
      dispatch$$12(ofError$$5($arg$$16));
    }));
  };

  return new _Types.List(bind$$9, new _Types.List());
}

function Cmd$002EOfPromise$$$result(task$$10) {
  const bind$$10 = function bind$$10(dispatch$$13) {
    (0, _Util.ignore)(task$$10.then(dispatch$$13));
  };

  return new _Types.List(bind$$10, new _Types.List());
}

function Cmd$$$attemptFunc(task$$11, arg$$9, ofError$$6) {
  return Cmd$002EOfFunc$$$attempt(task$$11, arg$$9, ofError$$6);
}