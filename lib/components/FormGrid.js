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
exports.FormGrid = exports.DEFAULT_COMPONENTS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useFormioContext_1 = require("../hooks/useFormioContext");
const usePagination_1 = require("../hooks/usePagination");
const react_1 = require("react");
const isFormioPaginationResponse = (obj) => {
    return obj.serverCount !== undefined && Array.isArray(obj);
};
exports.DEFAULT_COMPONENTS = {};
const DEFAULT_QUERY = {};
const FormGrid = ({ actions, components = exports.DEFAULT_COMPONENTS, onFormClick, forms, formQuery = DEFAULT_QUERY, limit = 10, }) => {
    const { Container = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), FormContainer = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), FormNameContainer = ({ children, onClick }) => ((0, jsx_runtime_1.jsx)("div", { onClick: onClick, children: children })), FormActionsContainer = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), FormActionButton = ({ action }) => ((0, jsx_runtime_1.jsx)("button", { type: "button", children: action === null || action === void 0 ? void 0 : action.name })), PaginationContainer = ({ children }) => (0, jsx_runtime_1.jsx)("ul", { children: children }), PaginationButton = ({ children }) => (0, jsx_runtime_1.jsx)("li", { children: children }), } = components;
    const { Formio } = (0, useFormioContext_1.useFormioContext)();
    const fetchFunction = (0, react_1.useCallback)((limit, skip) => {
        const formio = new Formio('/form');
        return formio.loadForms({ params: Object.assign(Object.assign({}, formQuery), { limit, skip }) });
    }, [formQuery, Formio]);
    const dataOrFnArg = forms ? forms : fetchFunction;
    const { data, total, page, nextPage, prevPage, setPage, hasMore } = (0, usePagination_1.usePagination)(1, limit, dataOrFnArg);
    const defaultActions = [
        { name: 'Edit', fn: (id) => onFormClick === null || onFormClick === void 0 ? void 0 : onFormClick(id) },
        {
            name: 'Delete',
            fn: (id) => __awaiter(void 0, void 0, void 0, function* () {
                if (window.confirm('Are you sure you want to delete this form?')) {
                    const formio = new Formio(`/form/${id}`);
                    yield formio.deleteForm();
                    setPage(1);
                }
            }),
        },
    ];
    const formActions = actions || defaultActions;
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [data.map((form) => ((0, jsx_runtime_1.jsxs)(FormContainer, { children: [(0, jsx_runtime_1.jsx)(FormNameContainer, { onClick: () => onFormClick === null || onFormClick === void 0 ? void 0 : onFormClick(form._id), children: form.title || form.name || form._id }), (0, jsx_runtime_1.jsx)(FormActionsContainer, { children: formActions.map((action, index) => ((0, jsx_runtime_1.jsx)(FormActionButton, { action: action, onClick: () => action.fn(form._id) }, `${action.name}-${index}`))) })] }, form._id))), (0, jsx_runtime_1.jsxs)(PaginationContainer, { children: [(0, jsx_runtime_1.jsx)(PaginationButton, { onClick: prevPage, disabled: page === 1, children: "Prev" }), isFormioPaginationResponse(data) &&
                        !total &&
                        Array.from({
                            length: Math.ceil(data.serverCount / limit),
                        }, (_, i) => i + 1).map((n) => ((0, jsx_runtime_1.jsx)(PaginationButton, { onClick: () => setPage(n), isActive: n === page, children: n }, `page-link-${n}`))), data &&
                        total &&
                        Array.from({
                            length: Math.ceil(total / limit),
                        }, (_, i) => i + 1).map((n) => ((0, jsx_runtime_1.jsx)(PaginationButton, { onClick: () => setPage(n), isActive: n === page, children: n }, `page-link-${n}`))), (0, jsx_runtime_1.jsx)(PaginationButton, { onClick: nextPage, disabled: !hasMore, children: "Next" })] })] }));
};
exports.FormGrid = FormGrid;
