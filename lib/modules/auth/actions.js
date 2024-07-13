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
exports.logout = exports.setUser = exports.initAuth = void 0;
const js_1 = require("@formio/js");
const type = __importStar(require("./constants"));
const requestUser = () => ({
    type: type.USER_REQUEST,
});
const receiveUser = (user) => ({
    type: type.USER_REQUEST_SUCCESS,
    user,
});
const failUser = (error) => ({
    type: type.USER_REQUEST_FAILURE,
    error,
});
const logoutUser = () => ({
    type: type.USER_LOGOUT,
});
const submissionAccessUser = (submissionAccess) => ({
    type: type.USER_SUBMISSION_ACCESS,
    submissionAccess,
});
const formAccessUser = (formAccess) => ({
    type: type.USER_FORM_ACCESS,
    formAccess,
});
const projectAccessUser = (projectAccess) => ({
    type: type.USER_PROJECT_ACCESS,
    projectAccess,
});
const rolesUser = (roles) => ({
    type: type.USER_ROLES,
    roles,
});
function transformSubmissionAccess(forms) {
    return Object.values(forms).reduce((result, form) => (Object.assign(Object.assign({}, result), { [form.name]: form.submissionAccess.reduce((formSubmissionAccess, access) => (Object.assign(Object.assign({}, formSubmissionAccess), { [access.type]: access.roles })), {}) })), {});
}
function transformFormAccess(forms) {
    return Object.values(forms).reduce((result, form) => (Object.assign(Object.assign({}, result), { [form.name]: form.access.reduce((formAccess, access) => (Object.assign(Object.assign({}, formAccess), { [access.type]: access.roles })), {}) })), {});
}
function transformProjectAccess(projectAccess) {
    return projectAccess.reduce((result, access) => (Object.assign(Object.assign({}, result), { [access.type]: access.roles })), {});
}
const initAuth = () => (dispatch) => {
    const projectUrl = js_1.Formio.getProjectUrl();
    dispatch(requestUser());
    Promise.all([
        js_1.Formio.currentUser(),
        js_1.Formio
            .makeStaticRequest(`${projectUrl}/access`)
            .then((result) => {
            const submissionAccess = transformSubmissionAccess(result.forms);
            const formAccess = transformFormAccess(result.forms);
            dispatch(submissionAccessUser(submissionAccess));
            dispatch(formAccessUser(formAccess));
            dispatch(rolesUser(result.roles));
        })
            .catch(() => { }),
        js_1.Formio
            .makeStaticRequest(projectUrl)
            .then((project) => {
            const projectAccess = transformProjectAccess(project.access);
            dispatch(projectAccessUser(projectAccess));
        })
            .catch(() => { }),
    ])
        .then(([user]) => {
        if (user) {
            dispatch(receiveUser(user));
        }
        else {
            dispatch(logoutUser());
        }
    })
        .catch((result) => {
        dispatch(failUser(result));
    });
};
exports.initAuth = initAuth;
const setUser = (user) => (dispatch) => {
    js_1.Formio.setUser(user);
    dispatch(receiveUser(user));
};
exports.setUser = setUser;
const logout = () => (dispatch) => {
    js_1.Formio.logout().then(() => {
        dispatch(logoutUser());
    });
};
exports.logout = logout;
