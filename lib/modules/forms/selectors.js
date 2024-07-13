"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectForms = void 0;
const root_1 = require("../root");
const selectForms = (name, state) => (0, root_1.selectRoot)(name, state).forms;
exports.selectForms = selectForms;
