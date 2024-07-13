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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = exports.Utils = exports.Components = exports.FormioProvider = exports.usePagination = exports.useFormioContext = exports.WizardBuilder = exports.Wizard = exports.WebformBuilder = exports.Webform = void 0;
const js_1 = require("@formio/js");
const Webform = js_1.Formio.Webform;
exports.Webform = Webform;
const WebformBuilder = js_1.Formio.WebformBuilder;
exports.WebformBuilder = WebformBuilder;
const Wizard = js_1.Formio.Wizard;
exports.Wizard = Wizard;
const WizardBuilder = js_1.Formio.WizardBuilder;
exports.WizardBuilder = WizardBuilder;
__exportStar(require("./components"), exports);
var useFormioContext_1 = require("./hooks/useFormioContext");
Object.defineProperty(exports, "useFormioContext", { enumerable: true, get: function () { return useFormioContext_1.useFormioContext; } });
var usePagination_1 = require("./hooks/usePagination");
Object.defineProperty(exports, "usePagination", { enumerable: true, get: function () { return usePagination_1.usePagination; } });
var FormioContext_1 = require("./contexts/FormioContext");
Object.defineProperty(exports, "FormioProvider", { enumerable: true, get: function () { return FormioContext_1.FormioProvider; } });
__exportStar(require("./constants"), exports);
__exportStar(require("./modules"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./utils"), exports);
var js_2 = require("@formio/js");
Object.defineProperty(exports, "Components", { enumerable: true, get: function () { return js_2.Components; } });
Object.defineProperty(exports, "Utils", { enumerable: true, get: function () { return js_2.Utils; } });
Object.defineProperty(exports, "Templates", { enumerable: true, get: function () { return js_2.Templates; } });
