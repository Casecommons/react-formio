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
const react_1 = require("@testing-library/react");
const usePagination_1 = require("../usePagination");
it('should return correct paginated data when passed a static array', () => {
    const myData = Array.from({
        length: 100,
    }, (_, i) => i);
    const { result } = (0, react_1.renderHook)(() => (0, usePagination_1.usePagination)(1, 10, myData));
    const { data } = result.current;
    expect(data).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
it('should return correct paginated data when passed a fetch function', () => __awaiter(void 0, void 0, void 0, function* () {
    const fakeData = Array.from({ length: 100 }, (_, i) => i);
    const fetchFunction = (limit, skip) => __awaiter(void 0, void 0, void 0, function* () {
        return fakeData.slice(skip, skip + limit);
    });
    const { result } = (0, react_1.renderHook)(() => (0, usePagination_1.usePagination)(1, 10, fetchFunction));
    (0, react_1.waitFor)(() => {
        const { data } = result.current;
        expect(data).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
}));
