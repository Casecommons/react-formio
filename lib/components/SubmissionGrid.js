"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const core_1 = require("@formio/core");
const react_1 = require("react");
const usePagination_1 = require("../hooks/usePagination");
const useFormioContext_1 = require("../hooks/useFormioContext");
const DEFAULT_COMPONENTS = {};
const DEFAULT_QUERY = {};
const isFormioPaginationResponse = (obj) => {
    return !!obj && Object.prototype.hasOwnProperty.call(obj, 'serverCount');
};
const toString = (value) => {
    switch (typeof value) {
        case 'object':
            return JSON.stringify(value);
        case 'string':
            return value;
    }
};
const getColumnsAndCells = (form, submissions) => {
    const columnsSet = new Set();
    core_1.Utils.eachComponent(form.components, (component) => {
        var _a;
        if (!Object.prototype.hasOwnProperty.call(component, 'tableView') ||
            component.tableView) {
            columnsSet.add({
                key: component.key,
                label: (_a = component.label) !== null && _a !== void 0 ? _a : component.key,
            });
        }
    });
    const columns = Array.from(columnsSet);
    const cells = submissions.map((submission) => {
        const row = columns.map((column) => {
            var _a, _b;
            return (_b = (_a = submission.data) === null || _a === void 0 ? void 0 : _a[column.key]) !== null && _b !== void 0 ? _b : '';
        });
        return { data: row, id: submission._id };
    });
    return { columns, cells };
};
const SubmissionTable = ({ formId, limit, submissions, onSubmissionClick, components = DEFAULT_COMPONENTS, submissionQuery = DEFAULT_QUERY, }) => {
    const { Container = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), TableContainer = ({ children }) => (0, jsx_runtime_1.jsx)("table", { children: children }), TableHeadContainer = ({ children }) => (0, jsx_runtime_1.jsx)("thead", { children: children }), TableHeaderRowContainer = ({ children }) => (0, jsx_runtime_1.jsx)("tr", { children: children }), TableHeadCell = ({ children }) => (0, jsx_runtime_1.jsx)("th", { children: children }), TableBodyRowContainer = ({ children, onClick }) => ((0, jsx_runtime_1.jsx)("tr", { onClick: onClick, children: children })), TableBodyContainer = ({ children }) => (0, jsx_runtime_1.jsx)("tbody", { children: children }), TableCell = ({ children }) => (0, jsx_runtime_1.jsx)("td", { children: children }), PaginationContainer = ({ children }) => (0, jsx_runtime_1.jsx)("ul", { children: children }), PaginationButton = ({ children }) => (0, jsx_runtime_1.jsx)("li", { children: children }), } = components;
    const [form, setForm] = (0, react_1.useState)();
    const { Formio } = (0, useFormioContext_1.useFormioContext)();
    const fetchFunction = (0, react_1.useCallback)((limit, skip) => {
        if (!formId) {
            console.warn("You're trying to fetch submissions without a form ID, did you mean to pass a submissions prop instead?");
            return Promise.resolve([]);
        }
        const formio = new Formio(`${Formio.projectUrl || Formio.baseUrl}/form/${formId}`);
        return formio.loadSubmissions({
            params: Object.assign(Object.assign({}, submissionQuery), { limit, skip }),
        });
    }, [submissionQuery, Formio, formId]);
    const dataOrFnArg = submissions ? submissions : fetchFunction;
    const { data, total, page, nextPage, prevPage, setPage, hasMore } = (0, usePagination_1.usePagination)(1, limit, dataOrFnArg);
    const { columns, cells } = form
        ? getColumnsAndCells(form, data)
        : { columns: [], cells: [] };
    (0, react_1.useEffect)(() => {
        const fetchForm = () => __awaiter(void 0, void 0, void 0, function* () {
            const formio = new Formio(`${Formio.projectUrl || Formio.baseUrl}/form/${formId}`);
            setForm(yield formio.loadForm());
        });
        fetchForm();
    }, [Formio, formId]);
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsxs)(TableContainer, { children: [(0, jsx_runtime_1.jsx)(TableHeadContainer, { children: (0, jsx_runtime_1.jsx)(TableHeaderRowContainer, { children: form &&
                                columns.map(({ key, label }) => {
                                    return ((0, jsx_runtime_1.jsx)(TableHeadCell, { children: label }, key));
                                }) }) }), (0, jsx_runtime_1.jsx)(TableBodyContainer, { children: cells.map(({ data, id }, index) => ((0, jsx_runtime_1.jsx)(TableBodyRowContainer, { onClick: () => {
                                onSubmissionClick === null || onSubmissionClick === void 0 ? void 0 : onSubmissionClick(id);
                            }, children: form &&
                                data.map((cell, index) => ((0, jsx_runtime_1.jsx)(TableCell, { children: toString(cell) }, `cell-${index}`))) }, `row-${index}`))) })] }), (0, jsx_runtime_1.jsxs)(PaginationContainer, { children: [(0, jsx_runtime_1.jsx)(PaginationButton, { onClick: prevPage, disabled: page === 1, children: "Prev" }), isFormioPaginationResponse(data) &&
                        !total &&
                        Array.from({
                            length: Math.ceil(data.serverCount / limit),
                        }, (_, i) => i + 1).map((n) => ((0, jsx_runtime_1.jsx)(PaginationButton, { onClick: () => setPage(n), isActive: n === page, children: n }, `page-link-${n}`))), data &&
                        total &&
                        Array.from({
                            length: Math.ceil(total / limit),
                        }, (_, i) => i + 1).map((n) => ((0, jsx_runtime_1.jsx)(PaginationButton, { onClick: () => setPage(n), isActive: n === page, children: n }, `page-link-${n}`))), (0, jsx_runtime_1.jsx)(PaginationButton, { onClick: nextPage, disabled: !hasMore, children: "Next" })] })] }));
};
exports.SubmissionTable = SubmissionTable;
