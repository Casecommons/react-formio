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
exports.deleteSubmission = exports.saveSubmission = exports.getSubmission = exports.resetSubmission = exports.clearSubmissionError = void 0;
const js_1 = require("@formio/js");
const types = __importStar(require("./constants"));
const clearSubmissionError = (name) => ({
    type: types.SUBMISSION_CLEAR_ERROR,
    name,
});
exports.clearSubmissionError = clearSubmissionError;
const requestSubmission = (name, id, formId, url) => ({
    type: types.SUBMISSION_REQUEST,
    name,
    id,
    formId,
    url,
});
const sendSubmission = (name) => ({
    type: types.SUBMISSION_SAVE,
    name,
});
const receiveSubmission = (name, submission, url) => ({
    type: types.SUBMISSION_SUCCESS,
    name,
    submission,
    url,
});
const failSubmission = (name, error) => ({
    type: types.SUBMISSION_FAILURE,
    name,
    error,
});
const resetSubmission = (name) => ({
    type: types.SUBMISSION_RESET,
    name,
});
exports.resetSubmission = resetSubmission;
const getSubmission = (name, id, formId, done = () => { }) => (dispatch, getState) => {
    // Check to see if the submission is already loaded.
    if (getState().id === id) {
        return;
    }
    const url = `${js_1.Formio.getProjectUrl()}/${formId ? `form/${formId}` : name}/submission/${id}`;
    const formio = new js_1.Formio(url);
    dispatch(requestSubmission(name, id, formId, url));
    formio
        .loadSubmission()
        .then((result) => {
        dispatch(receiveSubmission(name, result));
        done(null, result);
    })
        .catch((error) => {
        dispatch(failSubmission(name, error));
        done(error);
    });
};
exports.getSubmission = getSubmission;
const saveSubmission = (name, data, formId, done = () => { }) => (dispatch) => {
    dispatch(sendSubmission(name, data));
    const id = data._id;
    const formio = new js_1.Formio(`${js_1.Formio.getProjectUrl()}/${formId ? `form/${formId}` : name}/submission${id ? `/${id}` : ''}`);
    formio
        .saveSubmission(data)
        .then((result) => {
        const url = `${js_1.Formio.getProjectUrl()}/${formId ? `form/${formId}` : name}/submission/${result._id}`;
        dispatch(receiveSubmission(name, result, url));
        done(null, result);
    })
        .catch((error) => {
        dispatch(failSubmission(name, error));
        done(error);
    });
};
exports.saveSubmission = saveSubmission;
const deleteSubmission = (name, id, formId, done = () => { }) => (dispatch) => {
    const formio = new js_1.Formio(`${js_1.Formio.getProjectUrl()}/${formId ? `form/${formId}` : name}/submission/${id}`);
    return formio
        .deleteSubmission()
        .then(() => {
        dispatch((0, exports.resetSubmission)(name));
        done(null, true);
    })
        .catch((error) => {
        dispatch(failSubmission(name, error));
        done(error);
    });
};
exports.deleteSubmission = deleteSubmission;
