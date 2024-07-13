"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSubmission = void 0;
const root_1 = require("../root");
const selectSubmission = (name, state) => (0, root_1.selectRoot)(name, state).submission;
exports.selectSubmission = selectSubmission;
