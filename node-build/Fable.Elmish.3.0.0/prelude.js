"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = onError;
exports.toConsole = toConsole;

function onError(text, ex) {
  console.error(text, ex);
}

function toConsole(text$$1, o) {
  console.log(text$$1, o);
}