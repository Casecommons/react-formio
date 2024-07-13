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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBuilder = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const js_1 = require("@formio/js");
const structured_clone_1 = __importDefault(require("@ungap/structured-clone"));
const toggleEventHandlers = (builder, handlers, shouldAttach = true) => {
    const fn = shouldAttach ? 'on' : 'off';
    const { onSaveComponent, onEditComponent, onUpdateComponent, onDeleteComponent, onChange, } = handlers;
    builder.instance[fn]('saveComponent', (component, original, parent, path, index, isNew, originalComponentSchema) => {
        onSaveComponent === null || onSaveComponent === void 0 ? void 0 : onSaveComponent(component, original, parent, path, index, isNew, originalComponentSchema);
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
    builder.instance[fn]('updateComponent', (component) => {
        onUpdateComponent === null || onUpdateComponent === void 0 ? void 0 : onUpdateComponent(component);
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
    builder.instance[fn]('removeComponent', (component, parent, path, index) => {
        onDeleteComponent === null || onDeleteComponent === void 0 ? void 0 : onDeleteComponent(component, parent, path, index);
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
    builder.instance[fn]('cancelComponent', (component) => {
        onUpdateComponent === null || onUpdateComponent === void 0 ? void 0 : onUpdateComponent(component);
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
    builder.instance[fn]('editComponent', (component) => {
        onEditComponent === null || onEditComponent === void 0 ? void 0 : onEditComponent(component);
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
    builder.instance[fn]('addComponent', () => {
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
    builder.instance[fn]('pdfUploaded', () => {
        onChange === null || onChange === void 0 ? void 0 : onChange((0, structured_clone_1.default)(builder.instance.form));
    });
};
const createBuilderInstance = (element_1, ...args_1) => __awaiter(void 0, [element_1, ...args_1], void 0, function* (element, BuilderConstructor = js_1.FormBuilder, form = { display: 'form', components: [] }, options = {}) {
    options = Object.assign({}, options);
    form = Object.assign({}, form);
    const instance = new BuilderConstructor(element, form, options);
    yield instance.ready;
    return instance;
});
const DEFAULT_FORM = { display: 'form', components: [] };
const FormBuilder = ({ options, Builder, initialForm = DEFAULT_FORM, onBuilderReady, onChange, onDeleteComponent, onEditComponent, onSaveComponent, onUpdateComponent, }) => {
    const builder = (0, react_1.useRef)(null);
    const renderElement = (0, react_1.useRef)(null);
    const [instanceIsReady, setInstanceIsReady] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let ignore = false;
        const createInstance = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!renderElement.current) {
                console.warn('FormBuilder render element not found, cannot render builder.');
                return;
            }
            const instance = yield createBuilderInstance(renderElement.current, Builder, (0, structured_clone_1.default)(initialForm), options);
            if (instance) {
                if (ignore) {
                    instance.instance.destroy(true);
                    return;
                }
                if (onBuilderReady) {
                    onBuilderReady(instance);
                }
                builder.current = instance;
                setInstanceIsReady(true);
            }
            else {
                console.warn('Failed to create FormBuilder instance');
            }
        });
        createInstance();
        return () => {
            ignore = true;
            setInstanceIsReady(false);
            if (builder.current) {
                builder.current.instance.destroy(true);
            }
        };
    }, [Builder, initialForm, options, onBuilderReady]);
    (0, react_1.useEffect)(() => {
        if (instanceIsReady && builder.current) {
            toggleEventHandlers(builder.current, {
                onChange,
                onDeleteComponent,
                onEditComponent,
                onSaveComponent,
                onUpdateComponent,
            });
        }
        return () => {
            if (instanceIsReady && builder.current) {
                toggleEventHandlers(builder.current, {
                    onChange,
                    onDeleteComponent,
                    onEditComponent,
                    onSaveComponent,
                    onUpdateComponent,
                }, false);
            }
        };
    }, [
        instanceIsReady,
        onChange,
        onDeleteComponent,
        onEditComponent,
        onSaveComponent,
        onUpdateComponent,
    ]);
    return (0, jsx_runtime_1.jsx)("div", { ref: renderElement });
};
exports.FormBuilder = FormBuilder;
