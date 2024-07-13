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
exports.usePagination = void 0;
const react_1 = require("react");
function usePagination(initialPage, limit, dataOrFetchFunction) {
    const [data, setData] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(initialPage);
    const [hasMore, setHasMore] = (0, react_1.useState)(true);
    const total = Array.isArray(dataOrFetchFunction)
        ? dataOrFetchFunction.length
        : undefined;
    const fetchPage = (0, react_1.useCallback)((page) => __awaiter(this, void 0, void 0, function* () {
        const skip = (page - 1) * limit;
        let result;
        if (Array.isArray(dataOrFetchFunction)) {
            result = dataOrFetchFunction.slice(skip, skip + limit);
            setData(result);
        }
        else {
            result = yield dataOrFetchFunction(limit, skip);
            setData(result);
        }
        if (result.length < limit) {
            setHasMore(false);
        }
        else {
            setHasMore(true);
        }
    }), [limit, dataOrFetchFunction]);
    const nextPage = () => {
        if (hasMore) {
            const newPage = page + 1;
            fetchPage(newPage);
            setPage(newPage);
        }
    };
    const prevPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            fetchPage(newPage);
            setPage(newPage);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchPage(page);
    }, [fetchPage, page]);
    return {
        data,
        page,
        hasMore,
        nextPage,
        prevPage,
        total,
        setPage: (page) => {
            setPage(page);
            fetchPage(page);
        },
        fetchPage,
    };
}
exports.usePagination = usePagination;
