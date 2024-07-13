"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submissions = void 0;
const pick_1 = __importDefault(require("lodash/pick"));
const types = __importStar(require("./constants"));
function submissions({ name, limit = 10, query = {}, select = '', sort = '', }) {
    const initialState = {
        error: '',
        formId: '',
        isActive: false,
        limit,
        pagination: {
            numPages: 0,
            page: 1,
            total: 0,
        },
        query,
        select,
        sort,
        submissions: [],
    };
    return (state = initialState, action) => {
        // Only proceed for this submissions.
        if (action.name !== name) {
            return state;
        }
        switch (action.type) {
            case types.SUBMISSIONS_RESET:
                return initialState;
            case types.SUBMISSIONS_REQUEST:
                return Object.assign(Object.assign(Object.assign({}, state), (0, pick_1.default)(action.params, [
                    'limit',
                    'query',
                    'select',
                    'sort',
                ])), { error: '', formId: action.formId, isActive: true, pagination: Object.assign(Object.assign({}, state.pagination), { page: action.page }), submissions: [] });
            case types.SUBMISSIONS_SUCCESS: {
                const total = action.submissions.serverCount;
                return Object.assign(Object.assign({}, state), { isActive: false, pagination: Object.assign(Object.assign({}, state.pagination), { numPages: Math.ceil(total / state.limit), total }), submissions: action.submissions });
            }
            case types.SUBMISSIONS_FAILURE:
                return Object.assign(Object.assign({}, state), { error: action.error, isActive: false });
            default:
                return state;
        }
    };
}
exports.submissions = submissions;
