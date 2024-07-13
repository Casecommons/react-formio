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
exports.indexForms = exports.resetForms = void 0;
const js_1 = require("@formio/js");
const root_1 = require("../root");
const types = __importStar(require("./constants"));
const resetForms = (name) => ({
    type: types.FORMS_RESET,
    name,
});
exports.resetForms = resetForms;
const requestForms = (name, page, params) => ({
    type: types.FORMS_REQUEST,
    name,
    page,
    params,
});
const receiveForms = (name, forms) => ({
    type: types.FORMS_SUCCESS,
    name,
    forms,
});
const failForms = (name, error) => ({
    type: types.FORMS_FAILURE,
    name,
    error,
});
const indexForms = (name, page = 1, params = {}, done = () => { }) => (dispatch, getState) => {
    dispatch(requestForms(name, page, params));
    const { limit, query, select, sort } = (0, root_1.selectRoot)(name, getState());
    const formio = new js_1.Formio(`${js_1.Formio.getProjectUrl()}/form`);
    const requestParams = Object.assign(Object.assign({}, query), params);
    // Ten is the default so if set to 10, don't send.
    if (limit !== 10) {
        requestParams.limit = limit;
    }
    else {
        delete requestParams.limit;
    }
    if (page !== 1) {
        requestParams.skip = (page - 1) * limit;
    }
    else {
        delete requestParams.skip;
    }
    if (select) {
        requestParams.select = select;
    }
    else {
        delete requestParams.select;
    }
    if (sort) {
        requestParams.sort = sort;
    }
    else {
        delete requestParams.sort;
    }
    return formio
        .loadForms({ params: requestParams })
        .then((result) => {
        dispatch(receiveForms(name, result));
        done(null, result);
    })
        .catch((error) => {
        dispatch(failForms(name, error));
        done(error);
    });
};
exports.indexForms = indexForms;
