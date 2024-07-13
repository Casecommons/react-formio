"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSubmissions = void 0;
const root_1 = require("../root");
const selectSubmissions = (name, state) => (0, root_1.selectRoot)(name, state).submissions;
exports.selectSubmissions = selectSubmissions;
