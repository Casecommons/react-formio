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
exports.FormioContext = void 0;
exports.FormioProvider = FormioProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const js_1 = require("@formio/js");
const useBaseConfiguration = ({ baseUrl, projectUrl, }) => {
    // establish basic Formio configuration
    if (baseUrl) {
        js_1.Formio.setBaseUrl(baseUrl);
    }
    if (projectUrl) {
        js_1.Formio.setProjectUrl(projectUrl);
    }
    return {
        Formio: js_1.Formio,
        baseUrl: js_1.Formio.baseUrl,
        projectUrl: js_1.Formio.projectUrl,
    };
};
const useAuthentication = () => {
    const [token, setToken] = (0, react_1.useState)(js_1.Formio.getToken() || null);
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(!!token);
    (0, react_1.useEffect)(() => {
        const handleUserEvent = (user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                setToken(js_1.Formio.getToken());
                setIsAuthenticated(true);
            }
            else if (isAuthenticated) {
                yield js_1.Formio.logout();
                setToken(null);
                setIsAuthenticated(false);
            }
        });
        const handleStaleToken = () => __awaiter(void 0, void 0, void 0, function* () {
            if (isAuthenticated) {
                const user = yield js_1.Formio.currentUser();
                if (!user) {
                    setToken(null);
                    setIsAuthenticated(false);
                }
            }
        });
        js_1.Formio.events.on('formio.user', handleUserEvent);
        handleStaleToken();
        return () => {
            js_1.Formio.events.off('formio.user', handleUserEvent);
        };
    }, [isAuthenticated]);
    const logout = () => __awaiter(void 0, void 0, void 0, function* () {
        yield js_1.Formio.logout();
        setToken(null);
        setIsAuthenticated(false);
    });
    return { token, setToken, isAuthenticated, logout };
};
exports.FormioContext = (0, react_1.createContext)(null);
function FormioProvider({ children, baseUrl, projectUrl, }) {
    const formio = Object.assign(Object.assign({}, useBaseConfiguration({ baseUrl, projectUrl })), useAuthentication());
    return ((0, jsx_runtime_1.jsx)(exports.FormioContext.Provider, { value: formio, children: children }));
}
