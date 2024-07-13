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
exports.auth = void 0;
const type = __importStar(require("./constants"));
const initialState = {
    init: false,
    isActive: false,
    user: null,
    authenticated: false,
    submissionAccess: {},
    formAccess: {},
    projectAccess: {},
    roles: {},
    is: {},
    error: '',
};
function mapProjectRolesToUserRoles(projectRoles, userRoles) {
    return Object.entries(projectRoles).reduce((result, [name, role]) => (Object.assign(Object.assign({}, result), { [name]: userRoles.includes(role._id) })), {});
}
function getUserRoles(projectRoles) {
    return Object.keys(projectRoles).reduce((result, name) => (Object.assign(Object.assign({}, result), { [name]: name === 'anonymous' })), {});
}
const auth = () => (state = initialState, action) => {
    switch (action.type) {
        case type.USER_REQUEST:
            return Object.assign(Object.assign({}, state), { init: true, submissionAccess: false, isActive: true });
        case type.USER_REQUEST_SUCCESS:
            return Object.assign(Object.assign({}, state), { isActive: false, user: action.user, authenticated: true, is: mapProjectRolesToUserRoles(state.roles, action.user.roles), error: '' });
        case type.USER_REQUEST_FAILURE:
            return Object.assign(Object.assign({}, state), { isActive: false, is: getUserRoles(state.roles), error: action.error });
        case type.USER_LOGOUT:
            return Object.assign(Object.assign({}, state), { user: null, isActive: false, authenticated: false, is: getUserRoles(state.roles), error: '' });
        case type.USER_SUBMISSION_ACCESS:
            return Object.assign(Object.assign({}, state), { submissionAccess: action.submissionAccess });
        case type.USER_FORM_ACCESS:
            return Object.assign(Object.assign({}, state), { formAccess: action.formAccess });
        case type.USER_PROJECT_ACCESS:
            return Object.assign(Object.assign({}, state), { projectAccess: action.projectAccess });
        case type.USER_ROLES:
            return Object.assign(Object.assign({}, state), { roles: action.roles });
        default:
            return state;
    }
};
exports.auth = auth;
