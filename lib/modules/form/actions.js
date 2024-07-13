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
exports.deleteForm = exports.saveForm = exports.getForm = exports.resetForm = exports.clearFormError = void 0;
const js_1 = require("@formio/js");
const types = __importStar(require("./constants"));
const selectors_1 = require("./selectors");
const clearFormError = (name) => ({
    type: types.FORM_CLEAR_ERROR,
    name,
});
exports.clearFormError = clearFormError;
const requestForm = (name, id, url) => ({
    type: types.FORM_REQUEST,
    name,
    id,
    url,
});
const receiveForm = (name, form, url) => ({
    type: types.FORM_SUCCESS,
    form,
    name,
    url,
});
const failForm = (name, err) => ({
    type: types.FORM_FAILURE,
    error: err,
    name,
});
const resetForm = (name) => ({
    type: types.FORM_RESET,
    name,
});
exports.resetForm = resetForm;
const sendForm = (name, form) => ({
    type: types.FORM_SAVE,
    form,
    name,
});
const getForm = (name, id = '', done = () => { }) => {
    return (dispatch, getState) => {
        // Check to see if the form is already loaded.
        const form = (0, selectors_1.selectForm)(name, getState());
        if (form.components &&
            Array.isArray(form.components) &&
            form.components.length &&
            form._id === id) {
            return;
        }
        const path = `${js_1.Formio.getProjectUrl()}/${id ? `form/${id}` : name}`;
        const formio = new js_1.Formio(path);
        dispatch(requestForm(name, id, path));
        return formio
            .loadForm()
            .then((result) => {
            dispatch(receiveForm(name, result));
            done(null, result);
        })
            .catch((result) => {
            dispatch(failForm(name, result));
            done(result);
        });
    };
};
exports.getForm = getForm;
const saveForm = (name, form, done = () => { }) => {
    return (dispatch) => {
        dispatch(sendForm(name, form));
        const id = form._id;
        const path = `${js_1.Formio.getProjectUrl()}/form${id ? `/${id}` : ''}`;
        const formio = new js_1.Formio(path);
        formio
            .saveForm(form)
            .then((result) => {
            const url = `${js_1.Formio.getProjectUrl()}/form/${result._id}`;
            dispatch(receiveForm(name, result, url));
            done(null, result);
        })
            .catch((result) => {
            dispatch(failForm(name, result));
            done(result);
        });
    };
};
exports.saveForm = saveForm;
const deleteForm = (name, id, done = () => { }) => {
    return (dispatch) => {
        const path = `${js_1.Formio.getProjectUrl()}/form/${id}`;
        const formio = new js_1.Formio(path);
        return formio
            .deleteForm()
            .then(() => {
            dispatch((0, exports.resetForm)(name));
            done();
        })
            .catch((result) => {
            dispatch(failForm(name, result));
            done(result);
        });
    };
};
exports.deleteForm = deleteForm;
