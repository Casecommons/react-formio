"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopPropagationWrapper = exports.setColumnsWidth = exports.getComponentDefaultColumn = void 0;
const js_1 = require("@formio/js");
const get_1 = __importDefault(require("lodash/get"));
const getComponentDefaultColumn = (component) => ({
    component: js_1.Components.create(component, null, null, true),
    key: `data.${component.key}`,
    sort: true,
    title: component.label || component.title || component.key,
    value(submission) {
        const cellValue = (0, get_1.default)(submission, this.key, null);
        if (cellValue === null) {
            return '';
        }
        const rendered = this.component.asString(cellValue);
        if (cellValue !== rendered) {
            return {
                content: rendered,
                isHtml: true,
            };
        }
        return cellValue;
    },
});
exports.getComponentDefaultColumn = getComponentDefaultColumn;
/**
 * @param {import('./types').Column[]} columns
 */
function setColumnsWidth(columns) {
    if (columns.length > 6) {
        columns.forEach((column) => {
            column.width = 2;
        });
    }
    else {
        const columnsAmount = columns.length;
        const rowWidth = 12;
        const basewidth = Math.floor(rowWidth / columnsAmount);
        const remainingWidth = rowWidth - basewidth * columnsAmount;
        columns.forEach((column, index) => {
            column.width = index < remainingWidth ? basewidth + 1 : basewidth;
        });
    }
}
exports.setColumnsWidth = setColumnsWidth;
/**
 * @param {Function} fn
 * @returns {(function(*): void)|*}
 */
const stopPropagationWrapper = (fn) => (event) => {
    event.stopPropagation();
    fn();
};
exports.stopPropagationWrapper = stopPropagationWrapper;
