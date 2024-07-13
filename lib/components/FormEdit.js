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
exports.FormEdit = exports.DEFAULT_SETTINGS_FORM = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const FormBuilder_1 = require("./FormBuilder");
const Form_1 = require("./Form");
const useFormioContext_1 = require("../hooks/useFormioContext");
const DEFAULT_INITAL_FORM = {
    title: '',
    name: '',
    path: '',
    display: 'form',
    type: 'form',
    components: [],
};
exports.DEFAULT_SETTINGS_FORM = {
    display: 'form',
    components: [
        {
            label: 'Columns',
            columns: [
                {
                    components: [
                        {
                            label: '<b>Form Title</b>',
                            labelPosition: 'left-left',
                            applyMaskOn: 'change',
                            tableView: true,
                            validate: {
                                required: true,
                            },
                            key: 'title',
                            type: 'textfield',
                            input: true,
                        },
                        {
                            label: '<b>Form Name</b>',
                            labelPosition: 'left-left',
                            applyMaskOn: 'change',
                            tableView: true,
                            calculateValue: 'value = _.camelCase(data.title);',
                            validate: {
                                required: true,
                            },
                            key: 'name',
                            type: 'textfield',
                            input: true,
                        },
                        {
                            label: 'Columns',
                            columns: [
                                {
                                    components: [
                                        {
                                            label: '<b>Path</b>',
                                            applyMaskOn: 'change',
                                            tableView: true,
                                            calculateValue: 'value = _.camelCase(data.title).toLowerCase();',
                                            validate: {
                                                required: true,
                                            },
                                            key: 'path',
                                            type: 'textfield',
                                            input: true,
                                        },
                                    ],
                                    width: 6,
                                    offset: 0,
                                    push: 0,
                                    pull: 0,
                                    size: 'md',
                                    currentWidth: 6,
                                },
                                {
                                    components: [
                                        {
                                            label: '<b>Display As</b>',
                                            widget: 'choicesjs',
                                            tableView: true,
                                            data: {
                                                values: [
                                                    {
                                                        label: 'Form',
                                                        value: 'form',
                                                    },
                                                    {
                                                        label: 'Wizard',
                                                        value: 'wizard',
                                                    },
                                                    {
                                                        label: 'PDF',
                                                        value: 'pdf',
                                                    },
                                                ],
                                            },
                                            validate: {
                                                required: true,
                                            },
                                            key: 'display',
                                            type: 'select',
                                            input: true,
                                            defaultValue: 'form',
                                        },
                                    ],
                                    width: 6,
                                    offset: 0,
                                    push: 0,
                                    pull: 0,
                                    size: 'md',
                                    currentWidth: 6,
                                },
                            ],
                            key: 'columns',
                            type: 'columns',
                            input: false,
                            tableView: false,
                        },
                    ],
                    width: 9,
                    offset: 0,
                    push: 0,
                    pull: 0,
                    size: 'md',
                    currentWidth: 9,
                },
                {
                    components: [
                        {
                            label: 'Tags',
                            placeholder: 'Add a tag',
                            tableView: false,
                            key: 'tags',
                            type: 'tags',
                            input: true,
                        },
                    ],
                    offset: 0,
                    push: 0,
                    pull: 0,
                    size: 'md',
                    currentWidth: 3,
                    width: 3,
                },
            ],
            key: 'columns1',
            type: 'columns',
            input: false,
            tableView: false,
        },
    ],
};
const DEFAULT_SETTINGS_FORM_OPTIONS = {};
const DEFAULT_COMPONENTS = {};
const FormEdit = ({ initialForm = DEFAULT_INITAL_FORM, settingsForm = exports.DEFAULT_SETTINGS_FORM, settingsFormOptions = DEFAULT_SETTINGS_FORM_OPTIONS, components = DEFAULT_COMPONENTS, builderOptions, Builder, onSaveForm, saveFormFn, onSettingsFormReady, onBuilderReady, }) => {
    const { Formio } = (0, useFormioContext_1.useFormioContext)();
    const { Container = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), SettingsFormContainer = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), BuilderContainer = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), SaveButtonContainer = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children }), SaveButton = ({ onClick }) => ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, type: "button", children: "Save Form" })), } = components;
    const settingsFormData = (0, react_1.useRef)({
        title: initialForm.title,
        name: initialForm.name,
        path: initialForm.path,
        display: initialForm.display,
    });
    const currentForm = (0, react_1.useRef)(initialForm);
    const builderRef = (0, react_1.useRef)(null);
    const handleSaveForm = () => __awaiter(void 0, void 0, void 0, function* () {
        const formToSave = Object.assign(Object.assign({}, currentForm.current), settingsFormData.current);
        if (saveFormFn) {
            try {
                const form = yield saveFormFn(formToSave);
                onSaveForm === null || onSaveForm === void 0 ? void 0 : onSaveForm(form);
            }
            catch (err) {
                console.error('Error saving form', err);
            }
            return;
        }
        const formio = new Formio(`${Formio.projectUrl || Formio.baseUrl}/form`);
        try {
            const form = yield formio.saveForm(formToSave);
            onSaveForm === null || onSaveForm === void 0 ? void 0 : onSaveForm(form);
        }
        catch (error) {
            console.error('Error saving form', error);
        }
    });
    const handleBuilderReady = (builder) => {
        builderRef.current = builder;
        if (onBuilderReady) {
            onBuilderReady(builder);
        }
    };
    return ((0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)(SettingsFormContainer, { children: (0, jsx_runtime_1.jsx)(Form_1.Form, { src: settingsForm, onFormReady: onSettingsFormReady, options: settingsFormOptions, submission: {
                        data: {
                            title: initialForm.title,
                            name: initialForm.name,
                            path: initialForm.path,
                            display: initialForm.display,
                        },
                    }, onChange: ({ changed, data }, flags, modified) => {
                        var _a;
                        if (modified) {
                            if (changed.component.key === 'display') {
                                (_a = builderRef.current) === null || _a === void 0 ? void 0 : _a.setDisplay(data.display);
                            }
                            settingsFormData.current = data;
                        }
                    } }) }), (0, jsx_runtime_1.jsx)(BuilderContainer, { children: (0, jsx_runtime_1.jsx)(FormBuilder_1.FormBuilder, { initialForm: initialForm, options: builderOptions, Builder: Builder, onBuilderReady: handleBuilderReady, onChange: (form) => {
                        currentForm.current = form;
                    } }) }), (0, jsx_runtime_1.jsx)(SaveButtonContainer, { children: (0, jsx_runtime_1.jsx)(SaveButton, { onClick: handleSaveForm }) })] }));
};
exports.FormEdit = FormEdit;
