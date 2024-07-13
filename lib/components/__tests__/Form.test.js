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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
require("@testing-library/jest-dom");
const Form_1 = require("../Form");
const simpleForm = {
    display: 'form',
    components: [
        {
            label: 'First Name',
            key: 'firstName',
            type: 'textfield',
            input: true,
        },
        {
            label: 'Last Name',
            key: 'lastName',
            type: 'textfield',
            input: true,
            validate: {
                required: true,
            },
        },
        {
            label: 'Submit',
            type: 'button',
            key: 'submit',
            disableOnInvalid: true,
        },
    ],
};
test('loads and displays a simple form', () => __awaiter(void 0, void 0, void 0, function* () {
    const executeTests = () => __awaiter(void 0, void 0, void 0, function* () {
        expect(react_1.screen.getByText('First Name')).toBeInTheDocument();
        expect(react_1.screen.getByText('Last Name')).toBeInTheDocument();
        expect(react_1.screen.getByText('Submit')).toBeInTheDocument();
        expect(yield react_1.screen.findByRole('button')).toBeDisabled();
    });
    (0, react_1.render)((0, jsx_runtime_1.jsx)(Form_1.Form, { src: simpleForm, onFormReady: executeTests }));
}));
