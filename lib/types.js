"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSizes = exports.PageSize = exports.Operations = exports.Operation = exports.Columns = exports.Column = exports.AllItemsPerPage = void 0;
const prop_types_1 = __importDefault(require("prop-types"));
exports.AllItemsPerPage = 'all';
/**
 * @typedef Column
 * @type {object}
 * @property {string} key
 * @property {(boolean|string|Function)} sort
 * @property {string} title
 * @property {Function} value
 * @property {number} width
 */
/**
 * @constant
 * @type {Column}
 */
exports.Column = prop_types_1.default.shape({
    key: prop_types_1.default.string.isRequired,
    sort: prop_types_1.default.oneOfType([
        prop_types_1.default.bool,
        prop_types_1.default.string,
        prop_types_1.default.func,
    ]),
    title: prop_types_1.default.string,
    value: prop_types_1.default.func,
    width: prop_types_1.default.number,
});
/**
 * @constant
 * @type {Column[]}
 */
exports.Columns = prop_types_1.default.arrayOf(exports.Column);
/**
 * @typedef Operation
 * @type {object}
 * @property {string} [action]
 * @property {string} [buttonType]
 * @property {string} [icon]
 * @property {Function} [permissionsResolver]
 * @property {string} [title]
 */
/**
 * @constant
 * @type {Operation}
 */
exports.Operation = prop_types_1.default.shape({
    action: prop_types_1.default.string.isRequired,
    buttonType: prop_types_1.default.string,
    icon: prop_types_1.default.string,
    permissionsResolver: prop_types_1.default.func,
    title: prop_types_1.default.string,
});
/**
 * @constant
 * @type {Operation[]}
 */
exports.Operations = prop_types_1.default.arrayOf(exports.Operation);
/**
 * @typedef LabelValue
 * @type {object}
 * @property {string} label
 * @property {number} value
 */
/**
 * @constant
 * @type {(number|LabelValue)}
 */
exports.PageSize = prop_types_1.default.oneOfType([
    prop_types_1.default.number,
    prop_types_1.default.shape({
        label: prop_types_1.default.string,
        value: prop_types_1.default.number,
    }),
    prop_types_1.default.oneOf([exports.AllItemsPerPage]),
]);
/**
 * @constant
 * @type {PageSize[]}
 */
exports.PageSizes = prop_types_1.default.arrayOf(exports.PageSize);
