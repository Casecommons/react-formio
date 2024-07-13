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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lang_1 = require("lodash/lang");
const react_1 = __importStar(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
const isEqual_1 = __importDefault(require("lodash/isEqual"));
const js_1 = require("@formio/js");
const FormioReport = js_1.Formio.Report;
/**
 * @param {ReportProps} props
 * @returns {JSX.Element}s
 */
const Report = (props) => {
    let instance;
    let createPromise;
    let element;
    const [formio, setFormio] = (0, react_1.useState)(undefined);
    const jsonReport = (0, react_1.useRef)(undefined);
    (0, react_1.useEffect)(() => () => (formio ? formio.destroy(true) : null), [formio]);
    const createReportInstance = (srcOrReport) => {
        const { options = {}, onReportReady, projectEndpoint } = props;
        if (projectEndpoint) {
            options.projectEndpoint = projectEndpoint;
        }
        instance = new FormioReport(element, srcOrReport, options);
        createPromise = instance.ready.then((formioInstance) => {
            setFormio(formioInstance);
            if (onReportReady) {
                onReportReady(formioInstance);
            }
        });
        return createPromise;
    };
    const onAnyEvent = (event, ...args) => {
        if (event.startsWith('formio.')) {
            const funcName = `on${event.charAt(7).toUpperCase()}${event.slice(8)}`;
            // eslint-disable-next-line no-prototype-builtins
            if (props.hasOwnProperty(funcName) &&
                typeof props[funcName] === 'function') {
                props[funcName](...args);
            }
        }
    };
    const initializeFormio = () => {
        if (createPromise) {
            instance.onAny(onAnyEvent);
        }
    };
    (0, react_1.useEffect)(() => {
        const { src } = props;
        if (src) {
            createReportInstance(src);
            initializeFormio();
        }
    }, [props.src]);
    (0, react_1.useEffect)(() => {
        const { report } = props;
        // eslint-disable-next-line no-undef
        if (report && !(0, isEqual_1.default)(report, jsonReport.current)) {
            jsonReport.current = (0, lang_1.cloneDeep)(report);
            createReportInstance(report).then(() => {
                if (formio) {
                    formio.form = { components: [], report };
                    return formio;
                }
            });
            initializeFormio();
        }
    }, [props.report]);
    (0, react_1.useEffect)(() => {
        const { options = {} } = props;
        if (!options.events) {
            options.events = exports.Report.getDefaultEmitter();
        }
    }, [props.options]);
    if (!FormioReport) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "alert alert-danger", role: "alert", children: "Report is not found in Formio. Please make sure that you are using the Formio Reporting module and it is correctly included in your application." }));
    }
    return (0, jsx_runtime_1.jsx)("div", { ref: (el) => (element = el) });
};
exports.Report = Report;
/**
 * @typedef {object} Options
 * @property {boolean} [readOnly]
 * @property {boolean} [noAlerts]
 * @property {object} [i18n]
 * @property {string} [template]
 * @property {string} [projectEndpoint]
 */
/**
 * @typedef {object} ReportProps
 * @property {string} [src]
 * @property {string} [projectEndpoint]
 * @property {object} [report]
 * @property {Options} [options]
 * @property {function} [onFormLoad]
 * @property {function} [onError]
 * @property {function} [onRender]
 * @property {function} [onFocus]
 * @property {function} [onBlur]
 * @property {function} [onInitialized]
 * @property {function} [onReportReady]
 * @property {function} [onChange]
 * @property {function} [onRowClick]
 * @property {function} [onRowSelectChange]
 * @property {function} [onFetchDataError]
 * @property {function} [onChangeItemsPerPage]
 * @property {function} [onPage]
u */
exports.Report.propTypes = {
    src: prop_types_1.default.string,
    projectEndpoint: prop_types_1.default.string,
    report: prop_types_1.default.object,
    options: prop_types_1.default.shape({
        readOnly: prop_types_1.default.bool,
        noAlerts: prop_types_1.default.bool,
        i18n: prop_types_1.default.object,
        template: prop_types_1.default.string,
        language: prop_types_1.default.string,
    }),
    onRowClick: prop_types_1.default.func,
    onRowSelectChange: prop_types_1.default.func,
    onFetchDataError: prop_types_1.default.func,
    onChangeItemsPerPage: prop_types_1.default.func,
    onPage: prop_types_1.default.func,
    onChange: prop_types_1.default.func,
    onFormLoad: prop_types_1.default.func,
    onError: prop_types_1.default.func,
    onRender: prop_types_1.default.func,
    onFocus: prop_types_1.default.func,
    onBlur: prop_types_1.default.func,
    onInitialized: prop_types_1.default.func,
    onReportReady: prop_types_1.default.func,
};
exports.Report.getDefaultEmitter = () => {
    return new js_1.EventEmitter({
        wildcard: false,
        maxListeners: 0,
    });
};
exports.default = exports.Report;
