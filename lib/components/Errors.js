"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const prop_types_1 = __importDefault(require("prop-types"));
const Errors = (props) => {
    const { type = 'danger', errors } = props;
    const hasErrors = (error) => {
        if (Array.isArray(error)) {
            return error.filter((item) => !!item).length !== 0;
        }
        return !!error;
    };
    /**
     * @param {string|any[]} error
     * @returns {string|unknown[]|*}
     */
    const formatError = (error) => {
        if (typeof error === 'string') {
            return error;
        }
        if (Array.isArray(error)) {
            return error.map(formatError);
        }
        // eslint-disable-next-line no-prototype-builtins
        if (error.hasOwnProperty('errors')) {
            return Object.keys(error.errors).map((key, index) => {
                const item = error.errors[key];
                return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("strong", { children: [item.name, " (", item.path, ")"] }), ' ', "- ", item.message] }, index));
            });
        }
        // If this is a standard error.
        // eslint-disable-next-line no-prototype-builtins
        if (error.hasOwnProperty('message')) {
            return error.message;
        }
        // If this is a joy validation error.
        // eslint-disable-next-line no-prototype-builtins
        if (error.hasOwnProperty('name') && error.name === 'ValidationError') {
            return error.details.map((item, index) => {
                return (0, jsx_runtime_1.jsx)("div", { children: item.message }, index);
            });
        }
        // If a conflict error occurs on a form, the form is returned.
        // eslint-disable-next-line no-prototype-builtins
        if (error.hasOwnProperty('_id') && error.hasOwnProperty('display')) {
            return 'Another user has saved this form already. Please reload and re-apply your changes.';
        }
        return 'An error occurred. See console logs for details.';
    };
    // If there are no errors, don't render anything.
    if (!hasErrors(errors)) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: `alert alert-${type}`, role: "alert", children: formatError(errors) }));
};
Errors.propTypes = {
    errors: prop_types_1.default.any,
    type: prop_types_1.default.string,
};
exports.default = Errors;
