"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectForm = void 0;
const root_1 = require("../root");
const selectForm = (name, state) => (0, root_1.selectRoot)(name, state).form;
exports.selectForm = selectForm;
