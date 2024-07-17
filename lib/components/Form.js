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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const js_1 = require("@formio/js");
const structured_clone_1 = __importDefault(require("@ungap/structured-clone"));
const getDefaultEmitter = () => {
    return new js_1.EventEmitter({
        wildcard: false,
        maxListeners: 0,
    });
};
const onAnyEvent = (handlers, ...args) => {
    const [event, ...outputArgs] = args;
    if (event.startsWith('formio.')) {
        const funcName = `on${event.charAt(7).toUpperCase()}${event.slice(8)}`;
        switch (funcName) {
            case 'onPrevPage':
                if (handlers.onPrevPage)
                    handlers.onPrevPage(outputArgs[0], outputArgs[1]);
                break;
            case 'onNextPage':
                if (handlers.onNextPage)
                    handlers.onNextPage(outputArgs[0], outputArgs[1]);
                break;
            case 'onCancelSubmit':
                if (handlers.onCancelSubmit)
                    handlers.onCancelSubmit();
                break;
            case 'onCancelComponent':
                if (handlers.onCancelComponent)
                    handlers.onCancelComponent(outputArgs[0]);
                break;
            case 'onChange':
                if (handlers.onChange)
                    handlers.onChange(outputArgs[0], outputArgs[1], outputArgs[2]);
                break;
            case 'onCustomEvent':
                if (handlers.onCustomEvent)
                    handlers.onCustomEvent(outputArgs[0]);
                break;
            case 'onComponentChange':
                if (handlers.onComponentChange)
                    handlers.onComponentChange(outputArgs[0]);
                break;
            case 'onSubmit':
                if (handlers.onSubmit)
                    handlers.onSubmit(outputArgs[0], outputArgs[1]);
                break;
            case 'onSubmitDone':
                if (handlers.onSubmitDone)
                    handlers.onSubmitDone(outputArgs[0]);
                break;
            case 'onSubmitError':
                if (handlers.onSubmitError)
                    handlers.onSubmitError(outputArgs[0]);
                break;
            case 'onFormLoad':
                if (handlers.onFormLoad)
                    handlers.onFormLoad(outputArgs[0]);
                break;
            case 'onError':
                if (handlers.onError)
                    handlers.onError(outputArgs[0]);
                break;
            case 'onRender':
                if (handlers.onRender)
                    handlers.onRender(outputArgs[0]);
                break;
            case 'onAttach':
                if (handlers.onAttach)
                    handlers.onAttach(outputArgs[0]);
                break;
            case 'onBuild':
                if (handlers.onBuild)
                    handlers.onBuild(outputArgs[0]);
                break;
            case 'onFocus':
                if (handlers.onFocus)
                    handlers.onFocus(outputArgs[0]);
                break;
            case 'onBlur':
                if (handlers.onBlur)
                    handlers.onBlur(outputArgs[0]);
                break;
            case 'onInitialized':
                if (handlers.onInitialized)
                    handlers.onInitialized();
                break;
            case 'onLanguageChanged':
                if (handlers.onLanguageChanged)
                    handlers.onLanguageChanged();
                break;
            case 'onBeforeSetSubmission':
                if (handlers.onBeforeSetSubmission)
                    handlers.onBeforeSetSubmission(outputArgs[0]);
                break;
            case 'onSaveDraftBegin':
                if (handlers.onSaveDraftBegin)
                    handlers.onSaveDraftBegin();
                break;
            case 'onSaveDraft':
                if (handlers.onSaveDraft)
                    handlers.onSaveDraft(outputArgs[0]);
                break;
            case 'onRestoreDraft':
                if (handlers.onRestoreDraft)
                    handlers.onRestoreDraft(outputArgs[0]);
                break;
            case 'onSubmissionDeleted':
                if (handlers.onSubmissionDeleted)
                    handlers.onSubmissionDeleted(outputArgs[0]);
                break;
            case 'onRequestDone':
                if (handlers.onRequestDone)
                    handlers.onRequestDone();
                break;
            default:
                break;
        }
    }
    if (handlers.otherEvents && handlers.otherEvents[event]) {
        handlers.otherEvents[event](...outputArgs);
    }
};
const createWebformInstance = (FormConstructor_1, formSource_1, element_1, ...args_1) => __awaiter(void 0, [FormConstructor_1, formSource_1, element_1, ...args_1], void 0, function* (FormConstructor, formSource, element, options = {}) {
    if (!(options === null || options === void 0 ? void 0 : options.events)) {
        options.events = getDefaultEmitter();
    }
    if (typeof formSource !== 'string') {
        formSource = (0, structured_clone_1.default)(formSource);
    }
    const promise = FormConstructor
        ? new FormConstructor(element, formSource, options)
        : new js_1.Form(element, formSource, options);
    const instance = yield promise.ready;
    return instance;
});
// Define effective props (aka I want to rename these props but also maintain backwards compatibility)
const getEffectiveProps = (props) => {
    const { FormClass, formioform, form, src, formReady, onFormReady } = props;
    const formConstructor = FormClass !== undefined ? FormClass : formioform;
    const formSource = form !== undefined ? form : src;
    const formReadyCallback = onFormReady !== undefined ? onFormReady : formReady;
    return { formConstructor, formSource, formReadyCallback };
};
exports.Form = (0, react_1.forwardRef)((props, ref) => {
    const formInstance = (0, react_1.useRef)(null);
    const renderElement = (0, react_1.useRef)(null);
    const { formConstructor, formSource, formReadyCallback } = getEffectiveProps(props);
    const { src, form, submission, url, options, formioform, formReady, FormClass, style, className } = props, handlers = __rest(props, ["src", "form", "submission", "url", "options", "formioform", "formReady", "FormClass", "style", "className"]);
    const [instanceIsReady, setInstanceIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let ignore = false;
        const createInstance = () => __awaiter(void 0, void 0, void 0, function* () {
            if (renderElement.current === null) {
                console.warn('Form element not found');
                return;
            }
            if (typeof formSource === 'undefined') {
                console.warn('Form source not found');
                return;
            }
            const instance = yield createWebformInstance(formConstructor, formSource, renderElement.current, options);
            if (instance) {
                if (ignore) {
                    instance.destroy(true);
                    return;
                }
                if (typeof formSource === 'string') {
                    instance.src = formSource;
                }
                else if (typeof formSource === 'object') {
                    instance.form = formSource;
                    if (url) {
                        instance.url = url;
                    }
                }
                if (formReadyCallback) {
                    formReadyCallback(instance);
                }
                formInstance.current = instance;
                setInstanceIsReady(true);
            }
            else {
                console.warn('Failed to create form instance');
            }
        });
        createInstance();
        return () => {
            ignore = true;
            if (formInstance.current) {
                formInstance.current.destroy(true);
            }
        };
    }, [
        formConstructor,
        formReadyCallback,
        formSource,
        options,
        url,
        submission,
    ]);
    (0, react_1.useEffect)(() => {
        if (instanceIsReady &&
            formInstance.current &&
            Object.keys(handlers).length > 0) {
            formInstance.current.onAny((...args) => onAnyEvent(handlers, ...args));
        }
        return () => {
            if (instanceIsReady &&
                formInstance.current &&
                Object.keys(handlers).length > 0) {
                formInstance.current.offAny((...args) => onAnyEvent(handlers, ...args));
            }
        };
    }, [instanceIsReady, handlers]);
    (0, react_1.useEffect)(() => {
        if (instanceIsReady && formInstance.current && submission) {
            formInstance.current.submission = submission;
        }
    }, [instanceIsReady, submission]);
    (0, react_1.useImperativeHandle)(ref, () => ({
        formio: formInstance.current,
        element: renderElement.current,
    }));
    return (0, jsx_runtime_1.jsx)("div", { className: className, style: style, ref: renderElement });
});
exports.Form.displayName = 'Form';
