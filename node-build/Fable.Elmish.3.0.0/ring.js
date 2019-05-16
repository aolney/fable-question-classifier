"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RingState$00601$reflection = RingState$00601$reflection;
exports.RingBuffer$00601$reflection = RingBuffer$00601$reflection;
exports.RingBuffer$00601$$$$002Ector$$Z524259A4 = RingBuffer$00601$$$$002Ector$$Z524259A4;
exports.RingBuffer$00601$$Pop = RingBuffer$00601$$Pop;
exports.RingBuffer$00601$$Push$$2B595 = RingBuffer$00601$$Push$$2B595;
exports.RingBuffer$00601 = exports.RingState$00601 = void 0;

var _Types = require("../fable-library.2.3.8/Types");

var _Reflection = require("../fable-library.2.3.8/Reflection");

var _Util = require("../fable-library.2.3.8/Util");

var _Array = require("../fable-library.2.3.8/Array");

var _Option = require("../fable-library.2.3.8/Option");

var _Seq = require("../fable-library.2.3.8/Seq");

const RingState$00601 = (0, _Types.declare)(function Elmish_RingState(tag, name, ...fields) {
  _Types.Union.call(this, tag, name, ...fields);
}, _Types.Union);
exports.RingState$00601 = RingState$00601;

function RingState$00601$reflection($gen$$4) {
  return (0, _Reflection.union)("Elmish.RingState`1", [$gen$$4], RingState$00601, () => [["Writable", [(0, _Reflection.array)($gen$$4), _Reflection.int32]], ["ReadWritable", [(0, _Reflection.array)($gen$$4), _Reflection.int32, _Reflection.int32]]]);
}

const RingBuffer$00601 = (0, _Types.declare)(function Elmish_RingBuffer(size) {
  const $this$$1 = this;
  $this$$1.state = new RingState$00601(0, "Writable", (0, _Array.fill)(new Array((0, _Util.max)(_Util.comparePrimitives, size, 10)), 0, (0, _Util.max)(_Util.comparePrimitives, size, 10), null), 0);
});
exports.RingBuffer$00601 = RingBuffer$00601;

function RingBuffer$00601$reflection($gen$$5) {
  return (0, _Reflection.type)("Elmish.RingBuffer`1", [$gen$$5]);
}

function RingBuffer$00601$$$$002Ector$$Z524259A4(size) {
  return this instanceof RingBuffer$00601 ? RingBuffer$00601.call(this, size) : new RingBuffer$00601(size);
}

function RingBuffer$00601$$Pop(__) {
  const matchValue = __.state;

  if (matchValue.tag === 1) {
    const wix = matchValue.fields[1] | 0;
    const rix = matchValue.fields[2] | 0;
    const items = matchValue.fields[0];
    const rix$0027 = (rix + 1) % items.length | 0;

    if (rix$0027 === wix) {
      __.state = new RingState$00601(0, "Writable", items, wix);
    } else {
      __.state = new RingState$00601(1, "ReadWritable", items, wix, rix$0027);
    }

    return (0, _Option.some)(items[rix]);
  } else {
    return null;
  }
}

function RingBuffer$00601$$Push$$2B595(__$$1, item) {
  const matchValue$$2 = __$$1.state;

  if (matchValue$$2.tag === 1) {
    const wix$$2 = matchValue$$2.fields[1] | 0;
    const rix$$1 = matchValue$$2.fields[2] | 0;
    const items$$2 = matchValue$$2.fields[0];
    items$$2[wix$$2] = item;
    const wix$0027 = (wix$$2 + 1) % items$$2.length | 0;
    const matchValue$$3 = wix$0027 === rix$$1;

    if (matchValue$$3) {
      const items$$4 = RingBuffer$00601$$doubleSize(__$$1, rix$$1, items$$2);
      __$$1.state = new RingState$00601(1, "ReadWritable", items$$4, wix$0027, 0);
    } else {
      __$$1.state = new RingState$00601(1, "ReadWritable", items$$2, wix$0027, rix$$1);
    }
  } else {
    const ix = matchValue$$2.fields[1] | 0;
    const items$$1 = matchValue$$2.fields[0];
    items$$1[ix] = item;
    const wix$$1 = (ix + 1) % items$$1.length | 0;
    __$$1.state = new RingState$00601(1, "ReadWritable", items$$1, wix$$1, ix);
  }
}

function RingBuffer$00601$$doubleSize(this$, ix$$1, items$$5) {
  return (0, _Array.ofSeq)((0, _Seq.delay)(function () {
    return (0, _Seq.append)((0, _Seq.skip)(ix$$1, items$$5), (0, _Seq.delay)(function () {
      return (0, _Seq.append)((0, _Seq.take)(ix$$1, items$$5), (0, _Seq.delay)(function () {
        return (0, _Seq.collect)(function (matchValue$$4) {
          return (0, _Seq.singleton)(null);
        }, (0, _Seq.rangeNumber)(0, 1, items$$5.length));
      }));
    }));
  }), Array);
}