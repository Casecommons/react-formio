"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectIsActive = exports.selectError = exports.selectRoot = void 0;
const selectRoot = (name, state) => state[name];
exports.selectRoot = selectRoot;
const selectError = (name, state) => (0, exports.selectRoot)(name, state).error;
exports.selectError = selectError;
const selectIsActive = (name, state) => (0, exports.selectRoot)(name, state).isActive;
exports.selectIsActive = selectIsActive;
