"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormioContext = void 0;
const react_1 = require("react");
const FormioContext_1 = require("../contexts/FormioContext");
function useFormioContext() {
    const context = (0, react_1.useContext)(FormioContext_1.FormioContext);
    if (!context) {
        throw new Error('useFormioContext must be used within a FormioProvider component.');
    }
    return context;
}
exports.useFormioContext = useFormioContext;
