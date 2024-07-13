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
Object.defineProperty(exports, "__esModule", { value: true });
exports.form = void 0;
const types = __importStar(require("./constants"));
function form(config) {
    const initialState = {
        id: '',
        isActive: false,
        lastUpdated: 0,
        form: {},
        url: '',
        error: '',
    };
    return (state = initialState, action) => {
        // Only proceed for this form.
        if (action.name !== config.name) {
            return state;
        }
        switch (action.type) {
            case types.FORM_CLEAR_ERROR:
                return Object.assign(Object.assign({}, state), { error: '' });
            case types.FORM_REQUEST:
                return Object.assign(Object.assign({}, state), { isActive: true, id: action.id, form: {}, url: action.url, error: '' });
            case types.FORM_SUCCESS:
                return Object.assign(Object.assign({}, state), { isActive: false, id: action.form._id, form: action.form, url: action.url || state.url, error: '' });
            case types.FORM_FAILURE:
                return Object.assign(Object.assign({}, state), { isActive: false, isInvalid: true, error: action.error });
            case types.FORM_SAVE:
                return Object.assign(Object.assign({}, state), { isActive: true });
            case types.FORM_RESET:
                return initialState;
            default:
                return state;
        }
    };
}
exports.form = form;
